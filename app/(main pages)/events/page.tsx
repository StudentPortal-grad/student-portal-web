import React from "react";
import EventsTable from "./components/EventsTable";
import Link from "next/link";
import Image from "next/image";

export default function page() {
  return (
    <section className="flex flex-col gap-4 bg-white p-7">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-lg font-bold">Events</h1>
        <Link
          href="/events/new"
          className="bg-primary-blue-base flex items-center gap-1 rounded-[8px] px-4 py-3"
        >
          <Image src="/icons/plus.svg" alt="New Event" width={18} height={18} />
          <span className="text-sm font-medium text-white">New Event</span>
        </Link>
      </div>
      <EventsTable />
    </section>
  );
}
