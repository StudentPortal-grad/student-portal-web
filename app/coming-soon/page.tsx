import React from "react";
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import NewsTellerForm from "@/components/forms/NewsTellerForm";
export const metadata = {
  title: "coming soon",
};

export default function page() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  return (
    <section className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-10 text-center capitalize">
        <h1 className="text-black-100 text-3xl font-semibold sm:text-4xl md:text-5xl">
          Coming Soon
        </h1>
        <Image
          src="/pics/soon.svg"
          alt="coming soon image"
          width={200}
          height={200}
          className="h-auto w-full max-w-[150px] md:max-w-[200px] lg:max-w-[300px]"
          priority
        />
        <CountdownTimer targetDate={targetDate} />
        <NewsTellerForm />
      </div>
    </section>
  );
}
