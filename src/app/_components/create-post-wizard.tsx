"use client";

import Image from "next/image";

import {useUser} from "@clerk/nextjs";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod/v4";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Skeleton} from "@/components/ui/skeleton";
import {api} from "@/trpc/react";

type FormData = {
  content: string;
};

const LoadingPostWizard = () => {
  return (
    <div className="flex items-center gap-2.5 px-6 lg:px-8 py-4 my-2">
      {/* Profile image skeleton */}
      <Skeleton className="size-10 rounded-md" />
      {/* Input skeleton */}
      <div className="flex-grow">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      {/* Button skeleton */}
      <Skeleton className="h-10 w-28 rounded-md" />
    </div>
  );
};

const CreatePostWizard = () => {
  const {user, isLoaded} = useUser();
  const utils = api.useUtils();

  const form = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        content: z.emoji().min(1).max(180),
      })
    ),
    defaultValues: {
      content: "",
    },
    mode: "onChange",
  });

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      form.reset();
    },
  });

  const onSubmit = (values: FormData) => {
    createPost.mutate({content: values.content});
  };

  if (!isLoaded) {
    return <LoadingPostWizard />;
  }

  if (!user) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2.5 px-6 lg:px-8 py-4 my-2"
      >
        <Image
          src={user.imageUrl}
          alt={user.username ?? user.firstName ?? user.lastName ?? "user"}
          width={48}
          height={48}
          className="rounded-md"
          quality={100}
        />

        <FormField
          control={form.control}
          name="content"
          render={({field}) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type some emojis!"
                  className="flex-grow dark:bg-transparent border-0 shadow-none hover:outline-none focus:border-b focus-visible:ring-[0px] rounded-none border-dashed !pl-2"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pl-2 text-xs h-0" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="cursor-pointer min-w-28"
          disabled={createPost.isPending}
        >
          Post
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostWizard;
