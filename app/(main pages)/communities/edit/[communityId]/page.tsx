"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CommunityForm, {
  CommunityFormData,
} from "../../components/CommunityForm";

export default function EditCommunityModal() {
  const router = useRouter();
  return (
    <section className="flex items-start justify-center bg-white p-7">
      <CommunityForm
        mode="edit"
        onSave={(data: CommunityFormData) => {
          console.log("Edited community:", data);
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </section>
  );
}
