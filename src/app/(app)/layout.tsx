import React from "react";
import { getSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
   const session = await getSession();
   if (!session || !session.user) redirect("/auth/login");

   return (
      <div className="">
         <Navbar user={session.user} />

         <main className="ml-[13rem] px-6 py-6">{children}</main>
      </div>
   );
};

export default AppLayout;
