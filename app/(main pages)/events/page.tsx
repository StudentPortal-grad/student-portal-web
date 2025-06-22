import React, { Suspense } from "react";
import EventsTable from "./components/EventsTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/logout");
  }

  return (
    <section className="flex h-full flex-col bg-white p-7">
      <h1 className="mb-4 text-lg font-bold">Events</h1>
      <div className="min-h-0 flex-1">
        <Suspense fallback={<div>Loading events...</div>}>
          <EventsTable session={session} baseUrl={process.env.BASE_URL || ""} />
        </Suspense>
      </div>
    </section>
  );
}
