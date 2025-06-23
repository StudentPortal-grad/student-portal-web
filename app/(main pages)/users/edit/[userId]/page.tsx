import React from "react";
import UserForm, { UserFormData } from "../../components/UserForm";
import { auth } from "@/auth";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const session = await auth();
  const baseUrl = process.env.BASE_URL || "";

  return (
    <div className="flex items-start justify-center bg-white p-7">
      <UserForm
        mode="edit"
        userId={userId}
        session={session}
        baseUrl={baseUrl}
      />
    </div>
  );
}
