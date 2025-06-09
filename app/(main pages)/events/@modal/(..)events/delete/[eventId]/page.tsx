"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DeleteEventForm from "../../../../components/DeleteEventForm";

export default function DeleteEventModal() {
  const router = useRouter();
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <DeleteEventForm
        onDelete={() => {
          // Add your delete logic here
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </div>
  );
}
