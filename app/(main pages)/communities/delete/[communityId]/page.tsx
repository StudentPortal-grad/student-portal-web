"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DeleteCommunityForm from "../../components/DeleteCommunityForm";

export default function DeleteCommunityModal() {
  const router = useRouter();
  return (
    <section className="flex items-start justify-center bg-white p-7">
      <DeleteCommunityForm
        onDelete={() => {
          // Add your delete logic here
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </section>
  );
}
