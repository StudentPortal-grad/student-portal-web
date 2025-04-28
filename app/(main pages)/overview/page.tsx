import React from "react";
import Statistics from "./components/Statistics";
import QuickActions from "./components/QuickActions";
import Chart from "./components/Chart";
export default function page() {
  return (
    <section className="bg-white p-7">
      <h1 className="mb-4 text-2xl font-bold">Overview</h1>
      <div className="flex flex-col gap-7">
        <Statistics />
        <QuickActions />
        <Chart />
      </div>
    </section>
  );
}
