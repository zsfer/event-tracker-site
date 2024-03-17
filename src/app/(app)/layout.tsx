import React from "react";
import { getSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

const AppLayout = async () => {
   const session = await getSession();
   if (!session || !session.user) redirect("/auth/login");
   return (
      <div>
         <pre>{session && JSON.stringify(session.user, null, 2)}</pre>
      </div>
   );
};

export default AppLayout;
