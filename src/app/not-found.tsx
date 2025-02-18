import Link from "next/link";

import {Button} from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const NotFound = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center px-6 lg:px-8 text-center border-b border-dashed">
      <div className="flex flex-col items-center justify-center border-x border-dashed size-full max-w-4xl gap-6">
        <div className="space-y-2">
          <p className="text-muted-foreground line-clamp-3 text-xl">
            404 | The page you are looking for does not exist.
          </p>
        </div>
        <Link href={ROUTES.HOME}>
          <Button variant="secondary" className="gap-2 cursor-pointer">
            Back to home
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
