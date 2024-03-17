import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="my-24 space-y-10 max-w-screen-sm mx-auto">
         <h1 className="text-3xl font-black">seifer&apos; events</h1>
         {children}
      </div>
   );
};

export default AuthLayout;
