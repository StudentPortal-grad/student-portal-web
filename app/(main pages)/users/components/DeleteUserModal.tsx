"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

export default function DeleteUserModal({
  userId,
  modal = true,
  session,
  baseUrl,
  onDeleteSuccess,
}: {
  userId: string;
  modal?: boolean;
  session: Session | null;
  baseUrl: string;
  onDeleteSuccess?: () => void;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const response = await fetch(`${baseUrl}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Call the callback to trigger refetch if provided
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }

      // For modal, use router.back() to close it
      // For page, redirect to users with refetch parameter
      if (modal) {
        router.back();
        // Add a small delay to ensure modal closes, then trigger refetch
        setTimeout(() => {
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set("refetch", "true");
          router.replace(currentUrl.pathname + currentUrl.search);
        }, 100);
      } else {
        router.push("/users?refetch=true");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center ${
        modal ? "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" : "bg-white"
      }`}
    >
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
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
