"use client";
import React from "react";
import { Provider as JotaiProvider } from "jotai";
import { AuthProvider } from "@/lib/auth";

export const Providers = ({ children }: { children: React.ReactNode }) => {
   return (
      <AuthProvider>
         <JotaiProvider>{children}</JotaiProvider>
      </AuthProvider>
   );
};
