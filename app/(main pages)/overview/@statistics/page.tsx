import React from "react";
import Statistics from "../components/Statistics";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();

  const statsResponse = await fetch(`${process.env.BASE_URL}/dashboard/stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  const stats = await statsResponse.json();

  if (stats.message === "Invalid token") {
    redirect("/api/auth/logout");
  }
  if (!stats.success) {
    throw new Error(stats.message || "Failed to fetch statistics.");
  }

  return <Statistics data={stats.data} />;
}
