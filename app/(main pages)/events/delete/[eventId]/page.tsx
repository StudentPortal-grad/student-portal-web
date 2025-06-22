import React, { Suspense } from "react";
import DeleteEventForm from "../../components/DeleteEventForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DeleteEventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <section className="flex items-start justify-center bg-white p-7">
      <Suspense fallback={<div>Loading...</div>}>
        <DeleteEventForm
          eventId={params.eventId}
          modal={false}
          session={session}
          baseUrl={process.env.BASE_URL || ""}
        />
      </Suspense>
    </section>
  );
}
