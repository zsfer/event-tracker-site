"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { toast } from "sonner";

import { register as registerAction } from "@/lib/actions/auth";

const registerSchema = z.object({
   username: z.string().min(4, { message: "Username is too short!" }),
   displayName: z.string().min(4),
   password: z.string().min(8),
   confirmPassword: z.string().min(8),
});
type RegisterSchema = z.infer<typeof registerSchema>;

const RegisterPage = () => {
   const { handleSubmit, register } = useForm<RegisterSchema>({
      resolver: zodResolver(registerSchema),
   });

   const submit: SubmitHandler<RegisterSchema> = async ({
      username,
      displayName,
      password,
      confirmPassword,
   }) => {
      if (confirmPassword !== password) {
         toast.error("Passwords should be the same!");
         return;
      }

      toast.promise(
         registerAction(
            username,
            displayName,
            password,
            "https://ll933epnkxzegxph.public.blob.vercel-storage.com/avatars/ash%20baby-C4YHtuPSJXZLj4ReQ9YWqWM6kwY8s1.jpg"
         ),
         {
            loading: "Creating account",
            success: (data) => {
               return "Successfully created an account!";
            },
            error: (e) => {
               const error = e as Error;
               return error?.message.includes("UNIQUE")
                  ? "Account already exists!"
                  : error
                  ? error.message
                  : "Something went wrong";
            },
         }
      );
   };

   return (
      <div className="flex flex-col gap-5">
         <h2 className="text-xl font-black">Create an account</h2>
         <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
            <Label>Username</Label>
            <Input required {...register("username")} />

            <Label>Display name</Label>
            <Input required {...register("displayName")} />

            <Label>Password</Label>
            <Input required {...register("password")} type="password" />

            <Label>Confirm Password</Label>
            <Input required {...register("confirmPassword")} type="password" />

            {/* <Label>Profile picture</Label>
            <Input type="file" {...register("avatar")} /> */}

            <Button type="submit">Create account</Button>
         </form>
      </div>
   );
};

export default RegisterPage;
