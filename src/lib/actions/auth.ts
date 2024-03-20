"use server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { put } from "@vercel/blob";
import * as argon from "argon2";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../types";

export const uploadAvatar = async (file: File): Promise<string> => {
   try {
      const blob = await put(`avatars/${file.name}`, file, {
         access: "public",
      });
      return blob.url;
   } catch (e) {
      return "https://ll933epnkxzegxph.public.blob.vercel-storage.com/avatars/ash%20baby-c4yhtupsjxzlj4req9ywqwm6kwy8s1.jpg";
   }
};

export const register = async (
   username: string,
   displayName: string,
   password: string,
   avatarUrl?: string
) => {
   const pw = await argon.hash(password);

   const u = await db
      .insert(users)
      .values({
         username: `${username}`,
         displayName,
         password: pw,
         avatarUrl,
         isVerified: false,
      })
      .returning();

   await login(username, password);

   return !!u;
};

export const login = async (username: string, password: string) => {
   const _users = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
   const user = _users[0];

   if (!user) throw "User not found!";
   if (!(await argon.verify(user.password, password))) {
      throw "Invalid password";
   }

   const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
   const session = await encrypt({
      user,
      expires,
   });

   cookies().set("session", session, {
      expires,
      httpOnly: true,
   });

   redirect("/");
   return user;
};

export const signOut = () => {
   cookies().delete("session");

   redirect("/");
};

export const getSession = async () => {
   const session = cookies().get("session")?.value;
   if (!session) return null;
   return (await decrypt(session)) as { user: User };
};

const key = new TextEncoder().encode("secret balls");
export const encrypt = async (payload: any) => {
   return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30 day from now")
      .sign(key);
};

export const decrypt = async (input: string) => {
   const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
   });
   return payload;
};

export const updateSession = async (request: NextRequest) => {
   const session = request.cookies.get("session")?.value;
   if (!session) return;

   // const parsed = await decrypt(session);
   // parsed.expires = new Date(Date.now() + 10 * 1000);
   const res = NextResponse.next();
   // res.cookies.set({
   //    name: "session",
   //    value: await encrypt(parsed),
   //    httpOnly: true,
   //    expires: parsed.expires,
   // });

   return res;
};

export const getUserFromDb = async (id: string) => {
   return (await db.select().from(users).where(eq(users.id, id)))[0];
};
