import React from "react";
import Statistics from "./components/Statistics";
import CommunitiesList from "./components/CommunitiesList";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/logout");
  }

  return (
    <section className="bg-white p-7">
      <h1 className="mb-4 text-2xl font-bold">Communities Management</h1>
      <div className="flex flex-col gap-7">
        <Statistics
          session={session || null}
          baseUrl={process.env.BASE_URL || ""}
        />
        <CommunitiesList
          session={session || null}
          baseUrl={process.env.BASE_URL || ""}
        />
      </div>
    </section>
  );
}
