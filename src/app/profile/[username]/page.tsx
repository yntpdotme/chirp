import {notFound} from "next/navigation";

const ProfilePage = async ({params}: RouteParams) => {
  const {username} = await params;
  if (!username) notFound();

  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 size-full max-w-4xl lg:px-8 border-x border-dashed">
        <pre className="mt-2 text-xl">{username}</pre>
      </div>
    </section>
  );
};

export default ProfilePage;
