"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";

const registerSchema = z.object({
   username: z.string().min(4, { message: "Username is too short!" }),
   password: z.string().min(8),
   confirmPassword: z.string().min(8),
});
type RegisterSchema = z.infer<typeof registerSchema>;

const RegisterPage = () => {
   const { handleSubmit, register } = useForm<RegisterSchema>({
      resolver: zodResolver(registerSchema),
   });

   const submit: SubmitHandler<RegisterSchema> = async () => {};

   return (
      <div className="flex flex-col gap-5">
         <h2 className="text-xl font-black">Create an account</h2>
         <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
            <Label>Username</Label>
            <Input {...register("username")} />
         </form>
      </div>
   );
};

export default RegisterPage;
