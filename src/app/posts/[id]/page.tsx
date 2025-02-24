import {notFound} from "next/navigation";

import PostView from "@/components/posts/postview";
import {api} from "@/trpc/server";

const PostDetailsPage = async ({params}: RouteParams) => {
  const {id} = await params;
  if (!id) notFound();

  const post = await api.post.getPostById({id});
  if (!post) notFound();

  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col size-full max-w-4xl border-x border-dashed">
        <PostView post={post} className="border-t-0 border-b" />
      </div>
    </section>
  );
};

export default PostDetailsPage;

export const generateMetadata = async ({params}: RouteParams) => {
  const {id} = await params;
  if (!id) notFound();

  const post = await api.post.getPostById({id});
  if (!post) notFound();

  return {
    title: `${post.data.content} - @${post.author.username ?? post.author.fullName}`,
    description: `Chirp post ${id}`,
  };
};
