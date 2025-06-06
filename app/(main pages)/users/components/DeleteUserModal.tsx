"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DeleteUserModal({ userId }: { userId: string }) {
  // Submission handler
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your delete logic here
    router.back();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 text-center font-sans shadow-lg">
        <div className="mb-4 text-base font-medium text-gray-400">
          Delete User
        </div>
        <div className="my-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
            <Image
              src="/icons/delete-red.svg"
              alt="delete"
              width={32}
              height={32}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-6 text-lg font-normal">
            Are you sure that you want to delete this user ?
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button
              type="button"
              className="rounded-lg bg-gray-100 px-6 py-2 text-base font-medium text-gray-800 transition hover:bg-gray-200"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-red-500 px-6 py-2 text-base font-medium text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
