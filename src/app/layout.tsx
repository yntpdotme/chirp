import {type Metadata} from "next";
import {Geist, Montserrat} from "next/font/google";

import "@/styles/globals.css";

import Navbar from "./_components/navbar";
import Providers from "./_components/providers";

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
    <html
      lang="en"
      className={`${geist.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="flex h-[100dvh] flex-col">
        <Providers>
          <header>
            <Navbar />
          </header>
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
