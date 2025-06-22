"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

interface DeleteResourceFormProps {
  resourceId: string;
  modal?: boolean;
  session: Session | null;
  baseUrl: string;
  onDelete?: () => void;
  onCancel?: () => void;
}

export default function DeleteResourceForm({
  resourceId,
  modal = true,
  session,
  baseUrl,
  onDelete,
  onCancel,
}: DeleteResourceFormProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);

    try {
      const response = await fetch(`${baseUrl}/resources/${resourceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete resource");
      }

      // Call the callback to trigger refetch if provided
      if (onDelete) {
        onDelete();
      }

      // For modal, use router.back() to close it
      // For page, redirect to resources with refetch parameter
      if (modal) {
        router.back();
        // Add a small delay to ensure modal closes, then trigger refetch
        setTimeout(() => {
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set("refetch", "true");
          router.replace(currentUrl.pathname + currentUrl.search);
        }, 100);
      } else {
        router.push("/resources?refetch=true");
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full max-w-xl rounded-xl bg-white p-8 text-center font-sans shadow-lg">
      <div className="mb-4 text-base font-medium text-gray-400">
        Delete Resource
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
          Are you sure that you want to delete this resource?
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            className="rounded-lg bg-gray-100 px-6 py-2 text-base font-medium text-gray-800 transition hover:bg-gray-200"
            onClick={handleCancel}
            disabled={isDeleting}
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
  );
}
