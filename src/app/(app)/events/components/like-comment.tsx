import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, HeartCrack } from "lucide-react";
import { likeComment } from "@/lib/actions/events";
import { db } from "../../../../db";
import { userLikedComments } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export const LikeComment = async ({ commentId }: { commentId: string }) => {
   const isLiked =
      (
         await db
            .select()
            .from(userLikedComments)
            .where(eq(userLikedComments.commentId, commentId))
      ).length > 0;

   return (
      <form action={likeComment}>
         <input value={commentId} name="comment" hidden readOnly />
         <Button variant={"ghost"} size="sm">
            {isLiked ? <Heart className="text-red-500" /> : <HeartCrack />}
         </Button>
      </form>
   );
};
