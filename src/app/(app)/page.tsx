import React from "react";
import { getSession } from "@/lib/actions/auth";
import { getEvents } from "../../lib/actions/events";
import { EventCard } from "./events/components/event-card";

const HomePage = async () => {
   const session = await getSession();
   const events = await getEvents();

   return (
      <main className="flex min-h-screen flex-col gap-5 w-full">
         <h2 className="text-3xl font-black">Event feed</h2>
         {events && events.map((e, i) => <EventCard event={e} key={i} />)}
      </main>
   );
};

export default HomePage;
