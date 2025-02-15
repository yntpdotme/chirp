import type {Metadata} from "next";

import {LatestPost} from "@/app/_components/post";
import {HydrateClient, api} from "@/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <section className="flex justify-center border-b border-dashed overflow-y-auto h-full">
        <div className="flex flex-col items-center justify-center px-6 lg:px-8 border-x max-w-4xl w-full border-dashed">
          <LatestPost />
        </div>
      </section>
    </HydrateClient>
  );
}

export const metadata: Metadata = {
  title: "Home / Chirp",
};
