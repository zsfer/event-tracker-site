import React from "react";
import Link from "next/link";
import { HomeIcon, PencilIcon } from "lucide-react";
import { User } from "../lib/types";

const routes = [
   {
      label: "Home",
      route: "/",
      icon: <HomeIcon />,
   },
];
export const Navbar = ({ user }: { user: User }) => {
   return (
      <nav className="bg-white flex flex-col items-start min-w-[13rem] py-6 pr-4 gap-5 border-r h-full fixed top-0 ">
         <h1 className="text-2xl font-black">seifer&apos; events</h1>
         {routes.map((r, i) => (
            <Link
               key={i}
               href={r.route}
               className="flex flex-row gap-2 items-center rounded-full px-4 py-2 hover:bg-gray-100 w-full"
            >
               {r.icon}
               {r.label}
            </Link>
         ))}

         {user.isVerified && (
            <Link
               href="/events/new"
               className="flex flex-row gap-2 items-center rounded-full px-4 py-2 hover:bg-gray-100 w-full"
            >
               <PencilIcon />
               Create event
            </Link>
         )}
      </nav>
   );
};
