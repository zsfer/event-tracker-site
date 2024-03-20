import {
   text,
   sqliteTable,
   integer,
   primaryKey,
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const users = sqliteTable("user", {
   id: text("id")
      .$defaultFn(() => createId())
      .notNull()
      .primaryKey(),
   displayName: text("display_name").notNull(),
   username: text("username").notNull().unique(),
   password: text("password").notNull(),
   isVerified: integer("is_verified", { mode: "boolean" }).notNull(),
   avatarUrl: text("avatar_url"),
   dateCreated: integer("date_created", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
});

export const events = sqliteTable("event", {
   id: text("id")
      .$defaultFn(() => createId())
      .notNull()
      .primaryKey(),
   creatorId: text("creator_id").references(() => users.id),
   title: text("title").notNull(),
   description: text("description"),
   location: text("location"),
   eventDate: integer("event_date", { mode: "timestamp" }).notNull(),
   dateCreated: integer("date_created", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
});

export const eventImages = sqliteTable("event_images", {
   id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
   event_id: text("event_id").references(() => events.id),
   image_url: text("image_url").notNull(),
});

export const eventTags = sqliteTable("event_tags", {
   eventId: text("event_id").references(() => events.id),
   tag: text("tag"),
});

export const eventOrganizers = sqliteTable(
   "event_organizers",
   {
      eventId: text("event_id").references(() => events.id),
      userId: text("user_id").references(() => users.id),
      role: text("role", { enum: ["organizer", "admin", "moderator"] }),
   },
   (table) => {
      return { pk: primaryKey({ columns: [table.eventId, table.userId] }) };
   }
);

export const eventAttendees = sqliteTable(
   "event_attendees",
   {
      eventId: text("event_id").references(() => events.id),
      userId: text("user_id").references(() => users.id),
      registerDate: integer("register_date", { mode: "timestamp" }),
   },
   (table) => {
      return { pk: primaryKey({ columns: [table.eventId, table.userId] }) };
   }
);

export const comments = sqliteTable("comments", {
   id: text("id")
      .notNull()
      .$defaultFn(() => createId())
      .primaryKey(),
   eventId: text("event_id")
      .notNull()
      .references(() => events.id),
   userId: text("user_id").references(() => users.id),
   content: text("content").notNull(),
   dateCommented: integer("date_commented", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
});

export const userLikedEvents = sqliteTable(
   "user_liked_events",
   {
      eventId: text("event_id").references(() => events.id),
      userId: text("user_id").references(() => users.id),
      dateLiked: integer("date_liked", { mode: "timestamp" }).default(
         sql`CURRENT_TIMESTAMP`
      ),
   },
   (table) => {
      return { pk: primaryKey({ columns: [table.eventId, table.userId] }) };
   }
);

export const userLikedComments = sqliteTable(
   "user_liked_comments",
   {
      commentId: text("comment_id").references(() => comments.id),
      userId: text("user_id").references(() => users.id),
      dateLiked: integer("date_liked", { mode: "timestamp" }),
   },
   (table) => {
      return { pk: primaryKey({ columns: [table.commentId, table.userId] }) };
   }
);

export const eventRatings = sqliteTable(
   "event_ratings",
   {
      eventId: text("event_id").references(() => events.id),
      userId: text("user_id").references(() => users.id),
      rating: integer("rating", { mode: "number" }),
      dateRated: integer("date_rated", { mode: "timestamp" }),
   },
   (table) => {
      return { pk: primaryKey({ columns: [table.eventId, table.userId] }) };
   }
);

export const notifications = sqliteTable("notification", {
   id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
   userId: text("user_id").references(() => users.id),
   type: text("notif_type", { enum: ["rsvp", "like", "comment"] }).notNull(),
   dateCreated: integer("date_created", { mode: "timestamp" }).default(
      sql`CURRENT_TIMESTAMP`
   ),
});
