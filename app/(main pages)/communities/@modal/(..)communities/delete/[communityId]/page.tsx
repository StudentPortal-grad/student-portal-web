"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DeleteCommunityForm from "../../../../components/DeleteCommunityForm";

export default function DeleteCommunityModal() {
  const router = useRouter();
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <DeleteCommunityForm
        onDelete={() => {
          // Add your delete logic here
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </div>
  );
}
