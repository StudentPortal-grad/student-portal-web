import React from "react";
import DeleteUserModal from "../../components/DeleteUserModal";
import { auth } from "@/auth";

export default async function DeleteUserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const session = await auth();

  return (
    <div className="flex items-start justify-center bg-white p-7">
      <DeleteUserModal
        userId={userId}
        modal={false}
        session={session}
        baseUrl={process.env.BASE_URL || ""}
      />
    </div>
  );
}
