import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Not Found",
  description: "Not Found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="flex max-w-2xl flex-col items-center justify-center gap-10 text-center capitalize">
        <div>
          <h1 className="text-black-100 text-3xl font-semibold sm:text-4xl md:text-5xl">
            404 Not Found
          </h1>
          <p className="text-black-40 text-xs font-normal sm:text-sm">
            Sorry, we can't find that page.
          </p>
        </div>
        <Image
          src="/pics/404.svg"
          alt="not-found image"
          width={347}
          height={394}
          className="h-auto w-full max-w-[250px] sm:max-w-[300px] md:max-w-[347px]"
          priority
        />
        <Link
          href="/overview"
          replace
          className="bg-black-5 text-black-40 sm:text-md hover:bg-black-10 hover:text-black-100 rounded-lg px-3 py-2 text-sm font-normal transition-colors duration-300"
        >
          Back to Home Page
        </Link>
      </div>
    </section>
  );
}
