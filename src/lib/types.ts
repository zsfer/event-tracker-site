import { InferSelectModel } from "drizzle-orm";
import {
   comments,
   events,
   eventTags,
   notifications,
   users,
} from "../db/schema";
import { User } from "lucide-react";

export type User = InferSelectModel<typeof users>;
export type Event = InferSelectModel<typeof events>;
export type EventTag = InferSelectModel<typeof eventTags>;
export type Notification = InferSelectModel<typeof notifications>;
export type Comment = InferSelectModel<typeof comments>;

export type Session = {
   user?: User;
};
