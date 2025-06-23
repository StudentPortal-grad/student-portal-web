import React from "react";
import EventForm, { EventFormData } from "../../../../components/EventForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function getEventData(
  eventId: string,
  token: string,
  baseUrl: string,
): Promise<EventFormData | null> {
  try {
    const response = await fetch(`${baseUrl}/events/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      const eventData = data.data;
      const startDate = new Date(eventData.startDate);
      return {
        title: eventData.title || "",
        description: eventData.description || "",
        date: startDate.toISOString().split("T")[0],
        time: startDate.toTimeString().slice(0, 5),
        location: eventData.location || "",
        visibility: eventData.visibility || "Public",
        capacity: eventData.capacity?.toString() || "",
        category: eventData.category || "",
        tags: eventData.tags || [],
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching event data:", error);
    return null;
  }
}

export default async function EditEventModal({
  params,
}: {
  params: { eventId: string };
}) {
  const session = await auth();
  const baseUrl = process.env.BASE_URL || "";

  if (!session || !session.token) {
    redirect("/api/auth/logout");
  }
  const event = await getEventData(params.eventId, session.token, baseUrl);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <EventForm
        mode="edit"
        eventId={params.eventId}
        session={session}
        baseUrl={baseUrl}
        event={event || undefined}
      />
    </div>
  );
}
