"use client";
import React, { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tags } from "./tags";

const NewEventsPage = () => {
   const [tags, setTags] = useState<string[]>([]);
   return (
      <div className="flex flex-col gap-4">
         <div className="flex flex-row gap-1 items-center">
            <BackButton />
            <h2 className="font-bold text-2xl">Create event</h2>
         </div>

         <form className="flex flex-col gap-4">
            <Label htmlFor="title">Event title</Label>
            <Input id="title" name="title" />

            <Label htmlFor="description">Event description</Label>
            <Textarea id="description" name="description" />

            <Label htmlFor="image">Image</Label>
            <Input id="image" name="image" type="file" />

            <Label htmlFor="tags">Tags</Label>
            <Tags tags={tags} addTags={setTags} />
         </form>
      </div>
   );
};

export default NewEventsPage;
