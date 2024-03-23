import React from "react";

import { UserAvatar } from "@/components/user-avatar";
import dayjs from "dayjs";
import { LikeComment } from "./like-comment";
import { User, Comment } from "@/lib/types";

export const CommentCard = ({
   comment,
}: {
   comment: { comments: Comment; user: User };
}) => {
   return (
      <div className="flex flex-col gap-2">
         <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 items-start">
               <UserAvatar user={comment.user} />
               <div className="flex flex-col gap-2">
                  <span className="font-bold text-sm">
                     {comment.user.displayName}{" "}
                     <span className="font-normal text-gray-500">
                        @{comment.user.username} ∙{" "}
                        {dayjs(comment.comments.dateCommented).format(
                           "MMM DD, YYYY HH:mm"
                        )}
                     </span>
                  </span>
                  <p>{comment.comments.content}</p>
               </div>
            </div>
            <LikeComment commentId={comment.comments.id} />
         </div>
      </div>
   );
};
