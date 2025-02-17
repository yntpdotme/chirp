import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-between items-center border-x max-w-4xl w-full border-dashed px-6 lg:px-8 mx-auto py-4 font-montserrat">
      <p className="text-sm text-center">
        &copy; {new Date().getFullYear()} Chirp.
      </p>

      <Link href="https://yntp.me" target="_blank" rel="noreferrer">
        project by <span className="font-medium">yntp</span>
      </Link>
    </div>
  );
};

export default Footer;
