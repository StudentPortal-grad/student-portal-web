import React, { Suspense } from "react";
import DeleteCommunityForm from "../../../../components/DeleteCommunityForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DeleteCommunityModal({
  params,
}: {
  params: { communityId: string };
}) {
  const session = await auth();
  const { communityId } = await params;

  if (!session) {
    redirect("/api/auth/logout");
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Suspense fallback={<div>Loading...</div>}>
        <DeleteCommunityForm
          communityId={communityId}
          modal={true}
          session={session}
          baseUrl={process.env.BASE_URL || ""}
        />
      </Suspense>
    </div>
  );
}
