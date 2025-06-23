import React from "react";
import CommunityForm from "../../../components/CommunityForm";
import { auth } from "@/auth";

export default async function NewCommunityModal() {
  const baseUrl = process.env.BASE_URL || "";
  const session = await auth();

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <CommunityForm mode="new" baseUrl={baseUrl} session={session} />
    </div>
  );
}
