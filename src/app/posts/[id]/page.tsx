import {notFound} from "next/navigation";

const PostDetailsPage = async ({params}: RouteParams) => {
  const {id} = await params;
  if (!id) notFound();

  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 size-full max-w-4xl lg:px-8 border-x border-dashed">
        <pre className="mt-2 text-xl">{id}</pre>
      </div>
    </section>
  );
};

export default PostDetailsPage;
