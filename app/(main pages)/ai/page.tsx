import Image from "next/image";
import React from "react";
import ModelRetraining from "@/app/(main pages)/ai/components/ModelRetraining";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/logout");
  }

  return (
    <section className="flex h-full flex-col bg-white p-7">
      <Image
        src="/pics/ai-panner.svg"
        alt="ai panner"
        width={100}
        height={100}
        className="w-full"
      />
      <div className="min-h-0 flex-1">
        <ModelRetraining
          session={session}
          baseUrl={process.env.AI_API_URL || ""}
          modelApiKey={process.env.MODEL_API_KEY || ""}
        />
      </div>
    </section>
  );
}
