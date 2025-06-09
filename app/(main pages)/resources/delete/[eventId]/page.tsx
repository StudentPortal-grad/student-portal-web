"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DeleteEventForm from "../../components/DeleteResourceForm";

export default function DeleteEventModal() {
  const router = useRouter();
  return (
    <section className="flex items-start justify-center bg-white p-7">
      <DeleteEventForm
        onDelete={() => {
          // Add your delete logic here
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </section>
  );
}
