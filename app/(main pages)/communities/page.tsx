import React from "react";
import Statistics from "./components/Statistics";
import CommunitiesList from "./components/CommunitiesList";

export default function page() {
  return (
    <section className="bg-white p-7">
      <h1 className="mb-4 text-2xl font-bold">Communities Management</h1>
      <div className="flex flex-col gap-7">
        <Statistics />
        <CommunitiesList />
      </div>
    </section>
  );
}
