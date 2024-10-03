import type { Metadata } from "next";

import "./globals.css";

import {Poppins} from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is a platform for event management system.",
  icons:{
    icon: '/assets/images/logo.svg',
  }
};
const poppins=Poppins({
  subsets:['latin'],
  weight:['400','500','600','700'],
  variable:'--font-poppins',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={poppins.variable}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
