"use client";

import Image from "next/image";
import {useState} from "react";

import {useUser} from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {type RouterOutputs, api} from "@/trpc/react";

dayjs.extend(relativeTime);

type PostWithAuthor = RouterOutputs["post"]["getAll"][number];

const PostView = ({post}: {post: PostWithAuthor}) => {
  return (
    <article className="flex flex-col gap-2.5 px-6 lg:px-8 border-b border-dashed py-4">
      <div className="flex items-center justify-between gap-5">
        <Image
          src={post.author.imageUrl}
          alt={post.author.username ?? post.author.fullName}
          className="rounded-md"
          width={48}
          height={48}
          quality={100}
        />
        <div className="flex-grow items-center gap-2">
          <span className="flex gap-1 items-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {post.author.username ?? post.author.fullName}
            </p>
            <p className="text-sm text-muted-foreground font-light">
              · {dayjs(post.data.createdAt).fromNow()}
            </p>
          </span>
          <p className="dark:text-white">{post.data.content}</p>
        </div>
      </div>
    </article>
  );
};

export function Posts() {
  const [posts] = api.post.getAll.useSuspenseQuery();

  const {user} = useUser();

  const utils = api.useUtils();
  const [content, setContent] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setContent("");
    },
  });

  if (!user) return <p>Please sign in to create posts.</p>;

  return (
    <div className="w-full">
      {posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <PostView key={post.data.id} post={post} />
          ))}
        </div>
      ) : (
        <pre>There are no posts yet.</pre>
      )}
      <form
        onSubmit={e => {
          e.preventDefault();
          createPost.mutate({content, userId: user.id});
        }}
        className="flex gap-2.5 px-6 lg:px-8 mt-8"
      >
        <Input
          type="text"
          placeholder="What's happening?"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="flex-grow dark:bg-transparent"
        />
        <Button
          type="submit"
          disabled={createPost.isPending}
          className="min-w-32"
        >
          {createPost.isPending ? "Chirping..." : "Chirp"}
        </Button>
      </form>
    </div>
  );
}
