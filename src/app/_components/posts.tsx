"use client";

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import ROUTES from "@/constants/routes";
import {type RouterOutputs, api} from "@/trpc/react";

dayjs.extend(relativeTime);

type PostWithAuthor = RouterOutputs["post"]["getAll"][number];

const PostView = ({post}: {post: PostWithAuthor}) => {
  const router = useRouter();
  const username =
    post.author.username ??
    post.author.fullName.trim().toLowerCase().replace(/\s+/g, "_");

  return (
    <article
      className="flex flex-col gap-2.5 px-6 lg:px-8 border-t border-dashed py-4 hover:bg-gray-100 dark:hover:bg-primary/2 cursor-pointer"
      onClick={() => {
        router.push(ROUTES.POST(post.data.id));
      }}
    >
      <div className="flex gap-5 items-start">
        <Link href={ROUTES.PROFILE(username)}>
          <Image
            src={post.author.imageUrl}
            alt={post.author.username ?? post.author.fullName}
            className="rounded-lg"
            width={60}
            height={60}
            quality={100}
          />
        </Link>
        <div className="flex flex-col flex-grow gap-1">
          <span className="flex gap-1 items-center">
            <Link href={ROUTES.PROFILE(username)}>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {`@${username}`}
              </p>
            </Link>
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
      <div className="flex flex-col gap-4 px-6 lg:px-8 py-4">
        <h1 className="text-xl text-center font-montserrat font-light">
          Every chirp counts.
        </h1>
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
