import React from "react";
import DiscussionsList from "./components/DiscussionsList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/logout");
  }

  return (
    <section className="bg-white p-7">
      <h1 className="mb-4 text-2xl font-bold">
        Posts & Discussions Management
      </h1>
      <DiscussionsList session={session} baseUrl={process.env.BASE_URL || ""} />
    </section>
  );
}
