"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/types";

export const UserAvatar = ({ user }: { user: User }) => {
   return (
      <Avatar>
         <AvatarImage src={user.avatarUrl ?? ""} />
         <AvatarFallback>
            {user.displayName.substring(0, 1).toUpperCase()}
         </AvatarFallback>
      </Avatar>
   );
};
