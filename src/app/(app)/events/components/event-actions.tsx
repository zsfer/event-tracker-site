import React from "react";
import { Event } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { likeEvent, attendEvent, getEventStatus } from "@/lib/actions/events";
import { getSession } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

export const EventActions = async ({ event }: { event: Event }) => {
   const session = await getSession();
   const { isLiked, isAttending } = await getEventStatus(
      event.id,
      session?.user.id!
   );

   return (
      <form className="flex flex-row gap-3">
         <input hidden name="id" value={event.id} />
         <input hidden name="user" value={session?.user.id} />
         <Button
            formAction={likeEvent}
            variant={"outline"}
            className={cn("rounded-full", isLiked && "border-red-500 border")}
         >
            {isLiked && "💖"} Like{isLiked && "d"}
         </Button>

         <Button
            formAction={attendEvent}
            variant={"outline"}
            className={cn(
               "rounded-full",
               isAttending && "border-green-500 border"
            )}
         >
            {isAttending && "🫡"} I&apos;m going!
         </Button>
      </form>
   );
};
