"use client";

import PostView from "@/components/posts/postview";
import {api} from "@/trpc/react";

export function Posts() {
  const [posts] = api.post.getAll.useSuspenseQuery();

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center gap-4 px-6 lg:px-8 py-4 h-24">
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
        <div className="px-6 lg:px-8 pt-10 pb-4 text-center text-muted-foreground">
          <pre>No chirps yet. Be the first to chirp!</pre>
        </div>
      )}
    </div>
  );
}
