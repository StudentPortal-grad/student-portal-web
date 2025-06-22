import React from "react";
import DeleteUserModal from "../../../../components/DeleteUserModal";
import { auth } from "@/auth";

export default async function page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const session = await auth();

  return (
    <DeleteUserModal
      userId={userId}
      modal={true}
      session={session}
      baseUrl={process.env.BASE_URL || ""}
    />
  );
}
