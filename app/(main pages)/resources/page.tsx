import React, { Suspense } from "react";
import ResourcesTable from "./components/ResourcesTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/logout");
  }

  return (
    <section className="flex h-full flex-col bg-white p-7">
      <h1 className="mb-4 text-lg font-bold">Resources</h1>
      <div className="min-h-0 flex-1">
        <Suspense fallback={<div>Loading resources...</div>}>
          <ResourcesTable
            session={session}
            baseUrl={process.env.BASE_URL || ""}
          />
        </Suspense>
      </div>
    </section>
  );
}
