"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db";
import {
   comments,
   eventAttendees,
   eventOrganizers,
   eventTags,
   events,
   userLikedComments,
   userLikedEvents,
   users,
} from "../../db/schema";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notifyEvent } from "./notifications";

export const createEvent = async (form: FormData) => {
   const s = await getSession();
   const creatorId = s?.user.id!;
   const title = form.get("title")!.toString()!;
   const description = form.get("description")!.toString()!;
   const location = form.get("location")?.toString();
   const eventDate = new Date(form.get("date")?.toString()!);
   const dateCreated = new Date(Date.now());
   const tagsRaw = form.get("tags")?.toString();
   const tags = tagsRaw?.split(",").map((t) => t.trim().replace(" ", "-"));

   const evts = await db
      .insert(events)
      .values({
         title,
         eventDate,
         creatorId,
         description,
         location,
         dateCreated,
      })
      .returning({ eventId: events.id });

   for (const tag of tags!) {
      await db.insert(eventTags).values({ eventId: evts[0].eventId, tag: tag });
   }

   await db.insert(eventOrganizers).values({
      eventId: evts[0].eventId,
      userId: creatorId,
      role: "organizer",
   });
   redirect("/");
};

export const getEventStatus = async (event: string, user: string) => {
   const liked = await db
      .select()
      .from(userLikedEvents)
      .where(
         and(
            eq(userLikedEvents.eventId, event),
            eq(userLikedEvents.userId, user)
         )
      );

   const attendees = await db
      .select()
      .from(eventAttendees)
      .where(
         and(eq(eventAttendees.eventId, event), eq(eventAttendees.userId, user))
      );

   return {
      isLiked: liked && liked.length > 0,
      isAttending: attendees && attendees.length > 0,
   };
};

export const getEvents = async () => {
   const e = await db.select().from(events);
   return e;
};

export const likeEvent = async (form: FormData) => {
   const id = form.get("id")?.toString();
   const user = form.get("user")?.toString();

   try {
      await db.insert(userLikedEvents).values({ eventId: id, userId: user });
      notifyEvent(id!, "like");
   } catch (e) {
      await db
         .delete(userLikedEvents)
         .where(
            and(
               eq(userLikedEvents.eventId, id!),
               eq(userLikedEvents.userId, user!)
            )
         );
   }

   revalidatePath("/");
};

export const attendEvent = async (form: FormData) => {
   const id = form.get("id")?.toString();
   const user = form.get("user")?.toString();

   try {
      await db.insert(eventAttendees).values({
         eventId: id,
         userId: user,
         registerDate: new Date(Date.now()),
      });

      notifyEvent(id!, "rsvp");
   } catch (e) {
      await db
         .delete(eventAttendees)
         .where(
            and(
               eq(eventAttendees.eventId, id!),
               eq(eventAttendees.userId, user!)
            )
         );
   }
   revalidatePath("/");
};

export const completeEvent = async (form: FormData) => {
   const id = form.get("id")?.toString();

   await db.update(events).set({ isComplete: true }).where(eq(events.id, id!));

   revalidatePath("/");
};

export const postComment = async (form: FormData) => {
   const id = form.get("id")?.toString()!;
   const user = form.get("user")?.toString()!;
   const comment = form.get("comment")?.toString()!;

   await db.insert(comments).values({
      eventId: id,
      content: comment,
      userId: user,
      dateCommented: new Date(Date.now()),
   });
   notifyEvent(id!, "comment");

   revalidatePath("/");
};

export const getComments = async (event: string) => {
   const data = await db
      .select()
      .from(comments)
      .where(eq(comments.eventId, event))
      .innerJoin(users, eq(users.id, comments.userId))
      .orderBy(desc(comments.dateCommented));

   return data;
};

export const likeComment = async (form: FormData) => {
   const session = await getSession();
   const user = session?.user.id;
   const comment = form.get("comment")?.toString();

   const comments = await db
      .insert(userLikedComments)
      .values({
         commentId: comment,
         dateLiked: new Date(Date.now()),
         userId: user,
      })
      .returning();

   revalidatePath("/");
   return comments[0];
};
