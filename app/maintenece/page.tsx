import React from "react";
import Image from "next/image";

export const metadata = {
  title: "site is under maintenance",
};

export default function page() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-10 text-center capitalize">
        <h1 className="text-black-100 text-3xl font-semibold sm:text-4xl md:text-5xl">
          Site is Under Maintenance
        </h1>
        <Image
          src="/pics/maintenence.svg"
          alt="maintenence image"
          width={300}
          height={200}
          className="h-auto w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
          priority
        />
        <div>
          <p className="text-black-40 text-xs font-normal sm:text-sm">
            Need support?
          </p>
          <a
            href="mailto:no-reply@domain.com"
            className="text-secondary-purple-a text-xs font-normal underline-offset-2 hover:underline sm:text-sm"
          >
            no-reply@domain.com
          </a>
        </div>
      </div>
    </section>
  );
}
