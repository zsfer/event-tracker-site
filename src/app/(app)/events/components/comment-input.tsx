import React from "react";
import { Event } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { postComment } from "@/lib/actions/events";
import { getSession } from "../../../../lib/actions/auth";

export const CommentInput = async ({ event }: { event: Event }) => {
   const session = await getSession();
   return (
      <form className="w-full" action={postComment}>
         <Input
            placeholder="Leave a comment"
            name="comment"
            className="rounded-full px-5"
         />
         <input name="id" value={event.id} hidden />
         <input name="user" value={session!.user.id} hidden />
         <input type="submit" hidden />
      </form>
   );
};
