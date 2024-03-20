import React from "react";
import { getSession, getUserFromDb } from "@/lib/actions/auth";
import { getNotifications } from "@/lib/actions/notifications";
import { Notification } from "../../../lib/types";
import { UserAvatar } from "@/components/user-avatar";

const NotificationsPage = async () => {
   const session = await getSession();
   const notifs = await getNotifications(session?.user.id!);

   return (
      <main className="flex min-h-screen flex-col gap-5 w-full">
         <h2 className="text-3xl font-black">Your notifications</h2>

         <div className="space-y-5">
            {notifs &&
               notifs.map((n, i) => <NotificationItem notif={n} key={i} />)}
         </div>
      </main>
   );
};

const NotificationItem = async ({ notif }: { notif: Notification }) => {
   const user = await getUserFromDb(notif.userId!);
   let message = "is interested in";

   switch (notif.type) {
      case "comment":
         message = "commented on";
         break;
      case "like":
         message = "liked ";
         break;
      case "rsvp":
         message = "is attending";
         break;
   }

   return (
      <div className="flex flex-row items-center gap-2 border-b pb-5">
         <UserAvatar user={user} />
         <span>
            <span className="font-bold">
               {user.displayName} (@{user.username})
            </span>{" "}
            {message} your event
         </span>
      </div>
   );
};

export default NotificationsPage;
