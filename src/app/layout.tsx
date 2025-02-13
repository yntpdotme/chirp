import {type Metadata} from "next";
import {Geist, Montserrat} from "next/font/google";

import {ClerkProvider} from "@clerk/nextjs";

import Navbar from "@/app/_components/navbar";
import "@/styles/globals.css";
import {TRPCReactProvider} from "@/trpc/react";

export const metadata: Metadata = {
  title: "Chirp",
  description: "Where emojis speak louder than words",
  icons: [{rel: "icon", url: "/chirp.png"}],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable} ${montserrat.variable}`}>
        <TRPCReactProvider>
          <body className="flex h-[100dvh] flex-col">
            <header>
              <Navbar />
            </header>
            <main className="flex-grow">{children}</main>
          </body>
        </TRPCReactProvider>
      </html>
    </ClerkProvider>
  );
}
