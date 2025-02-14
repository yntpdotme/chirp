import { LatestPost } from "@/app/_components/post";
import { HydrateClient, api } from "@/trpc/server";
import type { Metadata } from "next";





export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <section className="flex flex-col h-full items-center justify-center px-12">
        <LatestPost />
      </section>
    </HydrateClient>
  );
}

export const metadata: Metadata = {
  title: "Home / Chirp",
};
