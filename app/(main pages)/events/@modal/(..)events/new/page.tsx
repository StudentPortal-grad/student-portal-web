import React from "react";
import EventForm, { EventFormData } from "../../../components/EventForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewEventModal() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/logout");
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <EventForm
        mode="new"
        session={session}
        baseUrl={process.env.BASE_URL || ""}
      />
    </div>
  );
}
