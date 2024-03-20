"use server";

import { eq } from "drizzle-orm";
import { db } from "../../db";
import { eventOrganizers, events, notifications } from "../../db/schema";

type NotificationType = "like" | "rsvp" | "comment";

export const notify = async (user: string, type: NotificationType) => {
   await db
      .insert(notifications)
      .values({ type, userId: user, dateCreated: new Date(Date.now()) });
};

export const notifyEvent = async (event: string, type: NotificationType) => {
   const organizers = await db.select().from(eventOrganizers);

   organizers.forEach((organizer) => {
      notify(organizer.userId!, type);
   });
};

export const getNotifications = async (user: string) => {
   const notifs = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, user));

   return notifs;
};
