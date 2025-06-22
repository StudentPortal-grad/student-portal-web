import React from "react";
import { auth } from "@/auth";
import DeleteResourceForm from "../../components/DeleteResourceForm";

export default async function DeleteResourcePage({
  params,
}: {
  params: Promise<{ resourceId: string }>;
}) {
  const { resourceId } = await params;
  const session = await auth();

  return (
    <section className="flex items-start justify-center bg-white p-7">
      <DeleteResourceForm
        resourceId={resourceId}
        modal={false}
        session={session}
        baseUrl={process.env.BASE_URL || ""}
      />
    </section>
  );
}
