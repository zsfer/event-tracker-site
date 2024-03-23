CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`user_id` text,
	`content` text NOT NULL,
	`date_commented` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `event_attendees` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text,
	`user_id` text,
	`register_date` integer,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `event_images` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text,
	`image_url` text NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `event_organizers` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text,
	`user_id` text,
	`role` text,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `event_tags` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text,
	`tag` text,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `event` (
	`id` text PRIMARY KEY NOT NULL,
	`creator_id` text,
	`title` text NOT NULL,
	`description` text,
	`location` text,
	`event_date` integer NOT NULL,
	`date_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notification` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`notif_type` text NOT NULL,
	`date_created` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_liked_comments` (
	`comment_id` text,
	`user_id` text,
	`date_liked` integer,
	PRIMARY KEY(`comment_id`, `user_id`),
	FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_liked_events` (
	`event_id` text,
	`user_id` text,
	`date_liked` integer DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`event_id`, `user_id`),
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`is_verified` integer NOT NULL,
	`avatar_url` text,
	`date_created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);