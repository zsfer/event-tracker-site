"use client";
import React, { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createEvent } from "@/lib/actions/events";
import { toast } from "sonner";

const NewEventsPage = () => {
   const create = async (form: FormData) => {
      await createEvent(form);
      toast.success("Created event");
   };
   return (
      <div className="flex flex-col gap-4">
         <div className="flex flex-row gap-1 items-center">
            <BackButton />
            <h2 className="font-bold text-2xl">Create event</h2>
         </div>

         <form className="flex flex-col gap-4">
            <Label htmlFor="title">Event title</Label>
            <Input id="title" name="title" />

            <Label htmlFor="date">Event date</Label>
            <Input id="date" name="date" type="datetime-local" />

            <Label htmlFor="description">Event description</Label>
            <Textarea id="description" name="description" />

            <Label htmlFor="image">Image</Label>
            <Input id="image" name="image" type="file" />
            {/* 
            <Label htmlFor="tags">Tags</Label>
            <Tags tags={tags} addTags={setTags} />
 */}
            <Button formAction={create}>Create event</Button>
         </form>
      </div>
   );
};

export default NewEventsPage;
