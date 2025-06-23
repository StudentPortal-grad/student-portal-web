import React from "react";
import UserForm, { UserFormData } from "../../../../components/UserForm";
import { auth } from "@/auth";

export default async function ViewUserModal({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const session = await auth();
  const baseUrl = process.env.BASE_URL || "";
  const { userId } = await params;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <UserForm
        mode="view"
        userId={userId}
        session={session}
        baseUrl={baseUrl}
      />
    </div>
  );
}
