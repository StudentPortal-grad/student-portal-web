import React from "react";
import EventsTable from "./components/EventsTable";

export default function page() {
  return (
    <section className="flex flex-col gap-4 bg-white p-7">
      <h1 className="mb-4 text-lg font-bold">Events</h1>
      <EventsTable />
    </section>
  );
}
