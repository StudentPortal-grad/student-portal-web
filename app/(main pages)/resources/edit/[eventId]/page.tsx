"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ResourceForm, { ResourceFormData } from "../../components/ResourceForm";

const mockResource: ResourceFormData = {
  title: "Graduation Ceremony 2025",
  description: "A special event for all graduates.",
  tags: "graduation,2025,ceremony",
  category: "Documents",
  visibility: "Public",
  file: null,
};

export default function EditEventModal() {
  const router = useRouter();
  return (
    <section className="flex items-start justify-center bg-white p-7">
      <ResourceForm
        mode="edit"
        resource={mockResource}
        onSave={(data: ResourceFormData) => {
          console.log("Saved event:", data);
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </section>
  );
}
