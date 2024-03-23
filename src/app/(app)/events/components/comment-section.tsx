import React from "react";
import { Event } from "@/lib/types";
import { getComments } from "@/lib/actions/events";
import { CommentCard } from "./comment-card";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "../../../../components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";

export const CommentSection = async ({ event }: { event: Event }) => {
   const comments = await getComments(event.id);

   return (
      comments.length > 0 && (
         <Collapsible>
            <CollapsibleTrigger asChild>
               <Button
                  variant={"link"}
                  size={"sm"}
                  className="flex flex-row items-center gap-1 text-gray-500"
               >
                  View all ({comments.length}) comments
               </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
               <div className="flex flex-col gap-4 pl-3 py-3">
                  {comments.map((c, i) => (
                     <CommentCard comment={c} key={i} />
                  ))}
               </div>
            </CollapsibleContent>
         </Collapsible>
      )
   );
};
