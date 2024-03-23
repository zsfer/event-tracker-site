"use client";
import React, { useRef } from "react";
import { Event } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { postComment } from "@/lib/actions/events";

export const CommentForm = ({
   event,
   userId,
}: {
   event: Event;
   userId: string;
}) => {
   const ref = useRef<HTMLFormElement>(null);
   return (
      <form
         ref={ref}
         className="w-full"
         action={async (form: FormData) => {
            await postComment(form);
            ref.current?.reset();
         }}
      >
         <Input
            placeholder="Leave a comment"
            name="comment"
            className="rounded-full px-5"
         />
         <input name="id" value={event.id} hidden readOnly />
         <input name="user" value={userId} hidden readOnly />
         <input type="submit" hidden />
      </form>
   );
};
