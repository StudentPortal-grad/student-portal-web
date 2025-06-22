import React from "react";
import { auth } from "@/auth";
import DeleteResourceForm from "../../../../components/DeleteResourceForm";

export default async function DeleteResourceModal({
  params,
}: {
  params: Promise<{ resId: string }>;
}) {
  const { resId } = await params;
  const session = await auth();

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <DeleteResourceForm
        resourceId={resId}
        modal={true}
        session={session}
        baseUrl={process.env.BASE_URL || ""}
      />
    </div>
  );
}
