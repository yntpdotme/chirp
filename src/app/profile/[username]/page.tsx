import Image from "next/image";
import {notFound} from "next/navigation";

import PostView from "@/components/posts/postview";
import {api} from "@/trpc/server";

const ProfileFeed = async ({userId}: {userId: string}) => {
  const posts = await api.post.getPostByUserId({userId});

  if (!posts || posts.length == 0)
    return (
      <div className="size-full px-6 lg:px-8 pt-10 pb-4 border-t border-dashed text-muted-foreground">
        <pre>User has not chirped yet.</pre>
      </div>
    );

  return (
    <div className="w-full">
      <div>
        {posts.map(post => (
          <PostView key={post.data.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const ProfilePage = async ({params}: RouteParams) => {
  const {username} = await params;
  if (!username) notFound();

  const user = await api.profile.getUserByUsername({
    username,
  });
  if (!user) notFound();

  const postCount = await api.post.getPostCountByUserId({
    userId: user.id,
  });

  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col size-full max-w-4xl border-x border-dashed">
        <div className="h-48 bg-gray-100 dark:bg-black w-full max-w-4xl font-montserrat flex justify-center items-center relative tracking-wide">
          {user.fullName}
          <Image
            src={user.imageUrl}
            alt={user.username ?? user.fullName}
            className="rounded-xl z-10 border border-primary/25 absolute bottom-0 left-6 lg:left-8 -mb-[75px]"
            width={150}
            height={150}
            quality={100}
          />
        </div>
        <div className="px-6 lg:px-8 pt-20 pb-4">
          <p className="text-2xl font-medium text-gray-600 dark:text-gray-300 font-montserrat tracking-tight">
            @{user.username ?? username}
          </p>
          <p className="mt-3 text-muted-foreground">{postCount} chirps</p>
        </div>
        <ProfileFeed userId={user.id} />
      </div>
    </section>
  );
};

export default ProfilePage;

export const generateMetadata = async ({params}: RouteParams) => {
  const {username} = await params;

  return {
    title: `Chirp / @${username}`,
    description: `(@${username}) chirps`,
  };
};
