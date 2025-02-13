import {SignInButton, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

import {Button} from "@/components/ui/button";

import Logo from "./logo";

const navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between gap-5 px-6 py-4 sm:px-12">
      <Logo
        classNames={{
          base: "scale-110 gap-2",
          image: "text-[]",
          text: "text-xl",
        }}
      />

      <div>
        <SignedOut>
          <SignInButton>
            <Button className="rounded-lg cursor-pointer px-4">
              Get Started
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default navbar;
