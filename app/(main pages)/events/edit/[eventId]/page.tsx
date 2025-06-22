"use client";
import React from "react";
import { useRouter } from "next/navigation";
import EventForm, { EventFormData } from "../../components/EventForm";

const mockEvent: EventFormData = {
  title: "Graduation Ceremony 2025",
  description: "A special event for all graduates.",
  tags: ["graduation", "2025", "ceremony"],
  category: "Documents",
  visibility: "Public",
  file: null,
  date: "2025-06-22",
  time: "10:00",
  location: "University of Colombo",
};

export default function EditEventModal() {
  const router = useRouter();
  return (
    <section className="flex items-start justify-center bg-white p-7">
      <EventForm
        mode="edit"
        event={mockEvent}
        onSave={(data: EventFormData) => {
          console.log("Saved event:", data);
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </section>
  );
}
