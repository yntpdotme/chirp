import type {Metadata} from "next";

import {Posts} from "@/app/_components/posts";
import {HydrateClient, api} from "@/trpc/server";

import CreatePostWizard from "./_components/create-post-wizard";

export default async function Home() {
  void api.post.getAll.prefetch();

  return (
    <HydrateClient>
      <section className="flex justify-center overflow-y-auto h-full">
        <div className="flex flex-col border-x max-w-4xl w-full border-dashed">
          <CreatePostWizard />
          <Posts />
        </div>
      </section>
    </HydrateClient>
  );
}

export const metadata: Metadata = {
  title: "Home / Chirp",
};
