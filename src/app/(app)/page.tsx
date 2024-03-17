"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/lib/auth";

const HomePage = () => {
   const { user } = useAuth();
   if (!user) redirect("/auth/login");

   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
   );
};

export default HomePage;
