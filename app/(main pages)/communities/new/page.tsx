"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CommunityForm from "../components/CommunityForm";

export default function NewEventModal() {
  const router = useRouter();
  return (
    <section className="flex items-start justify-center bg-white p-7">
      <CommunityForm mode="new" onCancel={() => router.back()} />
    </section>
  );
}
