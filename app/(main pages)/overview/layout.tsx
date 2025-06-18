import React from "react";

export default function Layout({
  children,
  chart,
  statistics,
}: {
  children: React.ReactNode;
  chart: React.ReactNode;
  statistics: React.ReactNode;
}) {
  return (
    <section className="bg-white p-7">
      <h1 className="mb-4 text-2xl font-bold">Overview</h1>
      <div className="flex flex-col gap-7">
        {statistics}
        {children}
        {chart}
      </div>
    </section>
  );
}
