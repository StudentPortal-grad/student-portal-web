import Image from "next/image";
import React from "react";
import ModelRetraining from "@/components/forms/ModelRetraining";

export default function page() {
  return (
    <section className="flex flex-col gap-7 bg-white p-7">
      <Image
        src="/pics/ai-panner.svg"
        alt="ai panner"
        width={100}
        height={100}
        className="w-full"
      />
      <ModelRetraining />
    </section>
  );
}
