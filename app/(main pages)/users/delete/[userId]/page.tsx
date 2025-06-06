"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DeleteUserPage({
  params,
}: {
  params: { userId: string };
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    router.back();
    router.refresh();
  };

  return (
    <div className="flex items-start justify-center bg-white p-7">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 text-center font-sans shadow-lg">
        <div className="px-6 py-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Image
                src="/icons/delete-red.svg"
                alt="Delete"
                width={24}
                height={24}
                className="text-red-600"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Delete User
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleDelete} className="mt-6">
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isDeleting}
                className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete User"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
