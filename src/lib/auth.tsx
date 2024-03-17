"use client";
import React from "react";
import { User } from "./types";

export type AuthContextType = {
   user: User | null;
   login: (username: string, password: string) => void;
   register: (user: Partial<User>) => void;
   signOut: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
   user: null,
   login: () => {},
   register: () => {},
   signOut: () => {},
});
export const useAuth = () => {
   return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = React.useState<User | null>(null);
   const register = (user: Partial<User>) => {
      // setUser(user);
   };
   const login = (username: string, password: string) => {};
   const signOut = () => {};

   return (
      <AuthContext.Provider value={{ user, register, login, signOut }}>
         {children}
      </AuthContext.Provider>
   );
};
