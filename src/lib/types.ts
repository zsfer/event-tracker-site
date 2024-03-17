import { InferSelectModel } from "drizzle-orm";
import { event, eventTag, notification, user } from "../db/schema";
import { User } from "lucide-react";

export type User = InferSelectModel<typeof user>;
export type Event = InferSelectModel<typeof event>;
export type EventTag = InferSelectModel<typeof eventTag>;
export type Notification = InferSelectModel<typeof notification>;
