import React from "react";
import CommunityForm from "../components/CommunityForm";
import { auth } from "@/auth";

export default async function NewCommunityModal() {
  const baseUrl = process.env.BASE_URL || "";
  const session = await auth();

  return (
    <section className="flex items-start justify-center bg-white p-7">
      <CommunityForm mode="new" baseUrl={baseUrl} session={session} />
    </section>
  );
}
