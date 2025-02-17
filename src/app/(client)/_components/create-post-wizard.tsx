"use client";

import Image from "next/image";

import {useUser} from "@clerk/nextjs";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

const CreatePostWizard = () => {
  const {user} = useUser();
  if (!user) return null;

  return (
    <div className="flex items-center gap-2.5 px-6 lg:px-8 py-4 my-2">
      <Image
        src={user.imageUrl}
        alt={user.username ?? user.firstName ?? user.lastName ?? "user"}
        width={48}
        height={48}
        className="rounded-md"
        quality={100}
      />

      <Input
        type="text"
        placeholder="Type some emojis!"
        className="flex-grow dark:bg-transparent border-0 shadow-none hover:outline-none focus:border-b focus-visible:ring-[0px] rounded-none border-dashed !pl-2"
      />

      <Button type="submit" className="cursor-pointer min-w-28">
        Post
      </Button>
    </div>
  );
};

export default CreatePostWizard;
