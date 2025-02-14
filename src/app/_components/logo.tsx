import Link from "next/link";

import ROUTES from "@/constants/routes";

type LogoProps = {
  width?: number;
  height?: number;
  classNames?: {
    base?: string;
    image?: string;
    text?: string;
  };
};

const Logo = ({
  width = 36,
  height = 36,
  classNames = {base: "", image: ""},
}: LogoProps) => {
  return (
    <Link href={ROUTES.HOME}>
      <div className={`flex gap-2.5 items-center ${classNames.base}`}>
        <svg
          width={width}
          height={height}
          viewBox="0 0 360 360"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`${classNames.image}`}
        >
          <path d="M136.501 111.901a8.5 8.5 0 0 1-5.177 7.924 8.5 8.5 0 0 1-9.297-1.778 8.5 8.5 0 0 1-1.888-9.275 8.502 8.502 0 0 1 13.838-2.817 8.5 8.5 0 0 1 2.524 5.946" />
          <path d="M300 0H60A60 60 0 0 0 0 60v240a60 60 0 0 0 60 60h240a60 60 0 0 0 42.426-17.574A60 60 0 0 0 360 300V60a59.997 59.997 0 0 0-60-60m0 178.5c-.6 2-1.3 4.1-2 6.1a111 111 0 0 1-104.7 74.8h-4.8l-12.7 33.3a5.7 5.7 0 0 1-.8 1.3h-.5l-1.2.8h-.5a6.5 6.5 0 0 1-2 0h-28.6a5.7 5.7 0 0 1-4.031-1.669 5.704 5.704 0 0 1 0-8.062 5.7 5.7 0 0 1 4.031-1.669h24.2l10-26.8a112 112 0 0 1-88.1-73.9 121.7 121.7 0 0 1-5.1-22.7 101.4 101.4 0 0 0-21.1-53.5 8.9 8.9 0 0 1-1.4-9.2 8.6 8.6 0 0 1 7.8-4.9h7.8A45.8 45.8 0 0 0 107.8 79 53.5 53.5 0 0 1 130 66.1a51.7 51.7 0 0 1 15.5-2.4 53.7 53.7 0 0 1 41.7 20 56.3 56.3 0 0 1 8.9 15.6c.917 2.4 1.62 4.876 2.1 7.4a93.4 93.4 0 0 0 89 64.6h7.1a6 6 0 0 1 4.8 2.1 5.7 5.7 0 0 1 .9 5.1" />
        </svg>
        <div
          className={`font-medium tracking-tight font-montserrat ${classNames.text}`}
        >
          Chirp
        </div>
      </div>
    </Link>
  );
};

export default Logo;
