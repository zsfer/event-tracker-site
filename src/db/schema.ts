import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const user = sqliteTable("user", {
   id: text("id")
      .$defaultFn(() => createId())
      .notNull()
      .primaryKey(),
   displayName: text("display_name").notNull(),
   username: text("username").notNull(),
   password: text("password").notNull(),
   isVerified: integer("is_verified", { mode: "boolean" }).notNull(),
   dateCreated: integer("date_created", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
});

export const event = sqliteTable("event", {
   id: text("id")
      .$defaultFn(() => createId())
      .notNull()
      .primaryKey(),
   creatorId: text("creator_id").references(() => user.id),
   title: text("title").notNull(),
   description: text("description"),
   location: text("description"),
   eventDate: integer("event_date", { mode: "timestamp" }).notNull(),
   dateCreated: integer("date_created", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
});

export const eventTag = sqliteTable("event_tags", {
   eventId: text("event_id").references(() => event.id),
   tag: text("tag"),
});

export const eventOrganizer = sqliteTable("event_organizers", {
   eventId: text("event_id").references(() => event.id),
   userId: text("user_id").references(() => user.id),
   role: text("role", { enum: ["organizer", "admin", "moderator"] }),
});

export const eventAttendee = sqliteTable("event_attendees", {
   eventId: text("event_id").references(() => event.id),
   userId: text("user_id").references(() => user.id),
   registerDate: integer("register_date", { mode: "timestamp" }),
});

export const comment = sqliteTable("comments", {
   id: text("id")
      .notNull()
      .$defaultFn(() => createId())
      .primaryKey(),
   eventId: text("event_id")
      .notNull()
      .references(() => event.id),
   userId: text("user_id").references(() => user.id),
   content: text("content").notNull(),
   dateCommented: integer("date_commented", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
});

export const userLikedEvents = sqliteTable("user_liked_posts", {
   eventId: text("event_id").references(() => event.id),
   userId: text("user_id").references(() => user.id),
   dateLiked: integer("date_liked", { mode: "timestamp" }).default(
      sql`CURRENT_TIMESTAMP`
   ),
});

export const userLikedComments = sqliteTable("user_liked_comments", {
   commentId: text("comment_id").references(() => comment.id),
   userId: text("user_id").references(() => user.id),
   dateLiked: integer("date_liked", { mode: "timestamp" }),
});

export const event_ratings = sqliteTable("event_ratings", {
   eventId: text("event_id").references(() => event.id),
   userId: text("user_id").references(() => user.id),
   rating: integer("rating", { mode: "number" }),
   dateRated: integer("date_rated", { mode: "timestamp" }),
});

export const notification = sqliteTable("notification", {
   id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
   userId: text("user_id").references(() => user.id),
   type: text("notif_type", { enum: ["rsvp", "like", "comment"] }).notNull(),
   dateCreated: integer("date_created", { mode: "timestamp" }).default(
      sql`CURRENT_TIMESTAMP`
   ),
});
