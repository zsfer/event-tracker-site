"use client";
import React from "react";

export const Tags = ({
   tags,
   addTags,
}: {
   tags: string[];
   addTags: (tags: []) => void;
}) => {
   const removeTag = (tag: string) => {};
   return (
      <div className="flex flex-row gap-2 items-center">
         {tags.map((t, i) => (
            <Tag />
         ))}
      </div>
   );
};
