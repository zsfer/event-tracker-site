"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const loginSchema = z.object({
   username: z.string(),
   password: z.string().min(8),
});
type LoginSchema = z.infer<typeof loginSchema>;

const LoginPage = () => {
   const { handleSubmit, register } = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema),
   });

   const submit: SubmitHandler<LoginSchema> = async () => {};

   return (
      <div className="flex flex-col gap-5">
         <h2 className="text-xl font-black">Login to your account</h2>
         <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
            <Label>Username</Label>
            <Input {...register("username")} />
            <Label>Password</Label>

            <Input type="password" {...register("password")} />
            <Button type="submit">Login</Button>
         </form>
         <div className="flex flex-row justify-between text-sm text-gray-500">
            <Link
               target="_blank"
               href="https://www.youtube.com/watch?v=6xvCJWfelzM"
            >
               Forgot password?
            </Link>
            <Link href="/auth/register">Create an account</Link>
         </div>
      </div>
   );
};

export default LoginPage;
