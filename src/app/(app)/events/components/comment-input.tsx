import React from "react";
import { Event } from "@/lib/types";
import { getSession } from "@/lib/actions/auth";
import { CommentForm } from "./comment-form";

export const CommentInput = async ({ event }: { event: Event }) => {
   const session = await getSession();
   return <CommentForm event={event} userId={session!.user!.id} />;
};
