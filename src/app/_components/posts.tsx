"use client";

import Image from "next/image";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {type RouterOutputs, api} from "@/trpc/react";

dayjs.extend(relativeTime);

type PostWithAuthor = RouterOutputs["post"]["getAll"][number];

const PostView = ({post}: {post: PostWithAuthor}) => {
  return (
    <article className="flex flex-col gap-2.5 px-6 lg:px-8 border-b border-dashed py-4 hover:bg-gray-100 dark:hover:bg-primary/2">
      <div className="flex gap-5 items-start">
        <Image
          src={post.author.imageUrl}
          alt={post.author.username ?? post.author.fullName}
          className="rounded-lg"
          width={60}
          height={60}
          quality={100}
        />
        <div className="flex flex-col flex-grow gap-1">
          <span className="flex gap-1 items-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {post.author.username ?? post.author.fullName}
            </p>
            <p className="text-sm text-muted-foreground font-light">
              · {dayjs(post.data.createdAt).fromNow()}
            </p>
          </span>
          <p className="text-2xl">{post.data.content}</p>
        </div>
      </div>
    </article>
  );
};

export function Posts() {
  const [posts] = api.post.getAll.useSuspenseQuery();

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 border-b border-dashed px-6 lg:px-8 py-4">
        <h1 className="text-xl text-center font-light">Your Feed</h1>
      </div>

      {posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <PostView key={post.data.id} post={post} />
          ))}
        </div>
      ) : (
        <pre>There are no posts yet.</pre>
      )}
    </div>
  );
}
