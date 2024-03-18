"use client";
import React from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const BackButton = () => {
   const router = useRouter();
   return (
      <Button
         variant="ghost"
         onClick={() => router.back()}
         className="p-2 rounded-full"
      >
         <XIcon />
      </Button>
   );
};
