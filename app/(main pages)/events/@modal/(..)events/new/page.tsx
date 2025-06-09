"use client";
import React from "react";
import { useRouter } from "next/navigation";
import EventForm, { EventFormData } from "../../../components/EventForm";

export default function NewEventModal() {
  const router = useRouter();
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <EventForm
        mode="new"
        onSave={(data: EventFormData) => {
          console.log("Created event:", data);
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </div>
  );
}
