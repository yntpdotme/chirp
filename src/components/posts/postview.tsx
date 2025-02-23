"use client";

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import ROUTES from "@/constants/routes";
import type {RouterOutputs} from "@/trpc/react";

dayjs.extend(relativeTime);

type PostWithAuthor = RouterOutputs["post"]["getAll"][number];

const PostView = ({post}: {post: PostWithAuthor}) => {
  const router = useRouter();
  const username =
    post.author.username ??
    post.author.fullName.trim().toLowerCase().replace(/\s+/g, "_");

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(ROUTES.PROFILE(username));
  };

  return (
    <Link href={ROUTES.POST(post.data.id)}>
      <article className="flex flex-col gap-2.5 px-6 lg:px-8 border-t border-dashed py-4 hover:bg-gray-50 dark:hover:bg-primary/2">
        <div className="flex gap-5 items-start">
          <Image
            src={post.author.imageUrl}
            alt={post.author.username ?? post.author.fullName}
            className="rounded-lg z-10"
            width={60}
            height={60}
            quality={100}
            onClick={handleProfileClick}
          />

          <div className="flex flex-col flex-grow gap-1">
            <span className="flex gap-1 items-center">
              <p
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
                onClick={handleProfileClick}
              >
                {`@${username}`}
              </p>

              <p className="text-sm text-muted-foreground font-light">
                · {dayjs(post.data.createdAt).fromNow()}
              </p>
            </span>
            <p className="text-2xl">{post.data.content}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostView;
