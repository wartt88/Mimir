import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Menu from "../components/ui/menu";
import { AuthProvider } from "./providers";
import { useSession } from "next-auth/react";
import { fetchCurrentUser } from "../models/userRequests";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mimir",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-row h-full min-w-[100%] justify-center items-center overflow-x-hidden">
            <Menu />
            <>{children}</>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
