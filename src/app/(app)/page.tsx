import React from "react";
import { getSession } from "@/lib/actions/auth";

const HomePage = async () => {
   const session = await getSession();
   return (
      <main className="flex min-h-screen flex-col items-center justify-between w-full">
         {session && JSON.stringify(session.user, null, 2)}
      </main>
   );
};

export default HomePage;
