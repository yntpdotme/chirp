import {type Metadata} from "next";
import {Geist, Montserrat} from "next/font/google";

import {Toaster} from "@/components/ui/sonner";
import "@/styles/globals.css";

import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import Providers from "./_components/providers";

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
      <body className="flex h-[100dvh] flex-col bg-[var(--background)] overscroll-none">
        <Providers>
          <header className="sticky top-0 inset-x-0 z-50 border-b border-dashed">
            <Navbar />
          </header>

          <div className="flex flex-col flex-grow">
            <main className="flex-grow overflow-y-auto">{children}</main>

            <footer className="border-t border-dashed">
              <Footer />
            </footer>
          </div>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Chirp",
  description: "Where emojis speak louder than words",
  icons: [{rel: "icon", url: "/chirp.png"}],

  generator: "Next.js",
  applicationName: "Chirp",
  referrer: "origin-when-cross-origin",

  keywords: [
    "chirp",
    "chirping",
    "emojis",
    "social media",
    "emoji reactions",
    "emoji communities",
    "emoji posts",
  ],

  authors: [{name: "Akash Kadlag", url: "https://yntp.me"}],
  creator: "Akash Kadlag",
  publisher: "Chirp",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
