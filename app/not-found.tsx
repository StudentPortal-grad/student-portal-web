import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="flex h-full w-full max-w-md flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center capitalize">
          <h1 className="text-black-100 mb-2 text-3xl font-semibold sm:text-4xl md:text-5xl">
            404 Not Found
          </h1>
          <p className="text-xs font-normal sm:text-sm">
            Sorry, we can't find that page.
          </p>
          <Image
            src="/pics/404.svg"
            alt="not-found"
            width={347}
            height={394}
            className="my-6 h-auto w-full max-w-[250px] sm:my-8 sm:max-w-[300px] md:my-10 md:max-w-[347px]"
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
      </div>
    </section>
  );
}
