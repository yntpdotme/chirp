import {SignInButton, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

import {Button} from "@/components/ui/button";

import Logo from "./logo";
import {ThemeSwitcher} from "./theme-switcher";

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between gap-5 px-6 py-4 lg:px-8 border-x border-dashed max-w-4xl mx-auto">
      <Logo
        classNames={{
          image: "text-[var(--primary)] dark:text-white",
          text: "text-[24px]",
        }}
      />

      <div className="flex gap-2.5">
        <ThemeSwitcher />

        <SignedOut>
          <SignInButton>
            <Button className="rounded-lg cursor-pointer px-4">
              Let&apos;s Chirp
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "!size-8 !rounded-md",
                userButtonAvatarBox: "!size-8 !rounded-md",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
