import React, { Suspense } from "react";
import DeleteEventForm from "../../../../components/DeleteEventForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DeleteEventModal({
  params,
}: {
  params: { eventId: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Suspense fallback={<div>Loading...</div>}>
        <DeleteEventForm
          eventId={params.eventId}
          modal={true}
          session={session}
          baseUrl={process.env.BASE_URL || ""}
        />
      </Suspense>
    </div>
  );
}
