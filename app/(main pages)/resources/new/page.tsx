"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ResourceForm, { ResourceFormData } from "../components/ResourceForm";

export default function NewEventModal() {
  const router = useRouter();
  return (
    <section className="flex items-start justify-center bg-white p-7">
      <ResourceForm
        mode="new"
        onSave={(data: ResourceFormData) => {
          console.log("Created event:", data);
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </section>
  );
}
