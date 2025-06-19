import React from "react";
import PasswordChangeForm from "../components/PasswordChangeForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const response = await fetch(
    `${process.env.BASE_URL}/users/${session.user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    },
  );

  const data = await response.json();

  if (data.message === "Invalid token") {
    redirect("/auth/login");
  }
  if (!data.success) {
    throw new Error(data.message);
  }

  const {
    data: { user },
  } = data;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="bg-primary-light rounded-2xl p-6">
        <div className="flex flex-col gap-4">
          <ProfileDetails user={user} />

          <div className="my-6 border-t border-gray-200"></div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Change Password</h2>
            <PasswordChangeForm
              session={session}
              baseUrl={process.env.BASE_URL || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileDetails({ user }: { user: any }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-semibold">Profile Details</h1>
      <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            disabled
            value={user.name}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            disabled
            value={user.email}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Rule</label>
          <input
            type="text"
            disabled
            value={user.role}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600"
          />
        </div>
      </div>
    </div>
  );
}
