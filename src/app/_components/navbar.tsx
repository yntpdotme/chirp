import {SignUpButton, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

import Logo from "./logo";

const navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between gap-5 px-6 py-4 sm:px-12">
      <Logo />

      <div>
        <SignedOut>
          <SignUpButton>
            <button className="bg-black text-white rounded-lg font-medium text-sm h-9 px-4 cursor-pointer">
              Get Started
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default navbar;
