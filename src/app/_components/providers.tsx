import type {ReactNode} from "react";

import {ClerkProvider} from "@clerk/nextjs";
import {ThemeProvider as NextThemesProvider} from "next-themes";

import {TRPCReactProvider} from "@/trpc/react";

const Providers = ({children}: {children: ReactNode}) => {
  return (
    <>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClerkProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ClerkProvider>
      </NextThemesProvider>
    </>
  );
};

export default Providers;
