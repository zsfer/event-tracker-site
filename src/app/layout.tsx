import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
   title: "Event Tracker",
   description: "Seifer is cool",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={cn(
               "min-h-screen bg-background font-sans antialiased mx-auto max-w-screen-lg",
               inter.variable
            )}
         >
            <Providers>{children}</Providers>

            <Toaster richColors expand />
         </body>
      </html>
   );
}
