import React from "react";
import DiscussionsList from "./components/DiscussionsList";

export default function page() {
  return (
    <section className="bg-white p-7">
      <h1 className="mb-4 text-2xl font-bold">
        Posts & Discussions Management
      </h1>
      <DiscussionsList />
    </section>
  );
}
