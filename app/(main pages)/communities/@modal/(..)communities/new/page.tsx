"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CommunityForm from "../../../components/CommunityForm";

export default function NewCommunityModal() {
  const router = useRouter();
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <CommunityForm mode="new" onCancel={() => router.back()} />
    </div>
  );
}
