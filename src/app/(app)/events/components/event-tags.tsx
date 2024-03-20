import React from "react";
import { Event } from "@/lib/types";
import { db } from "@/db";
import { eventTags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";

export const EventTags = async ({ event }: { event: Event }) => {
   const tags = await db
      .select()
      .from(eventTags)
      .where(eq(eventTags.eventId, event.id));
   return (
      <div className="flex flex-row gap-2 items-center">
         {tags &&
            tags.map((t, i) => (
               <Button
                  asChild
                  key={i}
                  className="rounded-full text-xs p-0 text-gray-800"
                  size={"sm"}
                  variant="link"
               >
                  <Link href={`events/tagged/${t.tag}`}>#{t.tag}</Link>
               </Button>
            ))}
      </div>
   );
};
