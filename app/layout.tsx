import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {NavBar} from "@/components/NavBar";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Blog Home",
    description: "New blog app",
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`night bg-[#D3D9D4]`}>
        <NavBar/>
        <>
            {children}
        </>
        </body>
        </html>
    );
}
