import React from "react";
import Statistics from "../components/Statistics";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Chart from "../components/Chart";

export default async function page() {
  const session = await auth();

  const chartResponse = await fetch(
    `${process.env.BASE_URL}/dashboard/user-history`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  const chart = await chartResponse.json();

  if (chart.message === "Invalid token") {
    redirect("/api/auth/logout");
  }
  if (!chart.success) {
    throw new Error(chart.message || "Failed to fetch chart data.");
  }

  return <Chart data={chart.data} />;
}
