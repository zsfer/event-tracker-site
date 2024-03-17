import { user } from "@/db/schema";

export type AuthContext = {
   user: typeof user;
};
