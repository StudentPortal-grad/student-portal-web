"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ResourceForm, {
  ResourceFormData,
} from "../../../../components/ResourceForm";

export default function NewEventModal() {
  const router = useRouter();
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <ResourceForm
        mode="edit"
        onSave={(data: ResourceFormData) => {
          console.log("Edited event:", data);
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </div>
  );
}
