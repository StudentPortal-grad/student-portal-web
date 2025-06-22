import React, { Suspense } from "react";
import DeleteCommunityForm from "../../components/DeleteCommunityForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DeleteCommunityPage({
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
    <section className="flex items-start justify-center bg-white p-7">
      <Suspense fallback={<div>Loading...</div>}>
        <DeleteCommunityForm
          communityId={communityId}
          modal={false}
          session={session}
          baseUrl={process.env.BASE_URL || ""}
        />
      </Suspense>
    </section>
  );
}
