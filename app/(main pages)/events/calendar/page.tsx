import React from "react";
import Calendar from "../components/Calendar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  attendees?: number;
  location?: string;
}

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const response = await fetch(`${process.env.BASE_URL}/events`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
  });

  const data = await response.json();

  if (data.message === "Invalid token") {
    redirect("/api/auth/logout");
  }

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch events.");
  }

  const calendarEvents: CalendarEvent[] = data.data.map((event: any) => ({
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    description: event.description,
    attendees: event.rsvps.length,
    location: event.location,
  }));

  return <Calendar events={calendarEvents} />;
}
