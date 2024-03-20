import React from "react";
import { Event } from "@/lib/types";
import dayjs from "dayjs";
import { EventTags } from "./event-tags";
import { EventActions } from "./event-actions";
import { CommentInput } from "./comment-input";
import { CommentSection } from "./comment-section";
import { UserAvatar } from "@/components/user-avatar";
import { getUserFromDb } from "@/lib/actions/auth";

export const EventCard = async ({ event }: { event: Event }) => {
   const user = await getUserFromDb(event.creatorId!);

   return (
      <div className="rounded-xl border px-3 py-5 flex flex-row gap-2">
         <UserAvatar user={user} />
         <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-row gap-1 items-center text-sm">
               <div className="font-bold">{user.displayName}</div>
               <div className="text-gray-500">
                  @{user.username} - {dayjs().to(event.dateCreated)}
               </div>
            </div>
            <hr />
            <div className="space-y-1">
               <div className="flex flex-row gap-2 items-center">
                  <h3 className="font-bold text-xl">{event.title}</h3>
                  <div className="text-md text-gray-500">
                     on {dayjs(event.eventDate).format("MMM DD, YYYY")}
                  </div>
               </div>
               <EventTags event={event} />
            </div>

            <p>{event.description}</p>
            <hr />
            <EventActions event={event} />
            <CommentInput event={event} />
            <CommentSection event={event} />
         </div>
      </div>
   );
};
