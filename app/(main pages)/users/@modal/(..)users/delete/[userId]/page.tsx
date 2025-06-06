import React from "react";
import DeleteUserModal from "../../../../components/DeleteUserModal";

export default async function page({ params }: { params: { userId: string } }) {
  const { userId } = await params;
  return <DeleteUserModal userId={userId} />;
}
