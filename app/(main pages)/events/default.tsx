import React from "react";
import EventsTable from "./components/EventsTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/logout");
  }
  return (
    <section className="flex flex-col gap-4 bg-white p-7">
      <h1 className="mb-4 text-lg font-bold">Events</h1>
      <EventsTable session={session} baseUrl={process.env.BASE_URL || ""} />
    </section>
  );
}
