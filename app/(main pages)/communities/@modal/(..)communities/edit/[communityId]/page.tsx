"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CommunityForm, {
  CommunityFormData,
} from "../../../../components/CommunityForm";

export default function EditCommunityModal() {
  const router = useRouter();
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <CommunityForm
        mode="edit"
        onSave={(data: CommunityFormData) => {
          console.log("Edited community:", data);
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </div>
  );
}
