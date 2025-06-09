import React from "react";
import Image from "next/image";

interface DeleteEventFormProps {
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteEventForm({
  onDelete,
  onCancel,
}: DeleteEventFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <div className="w-full max-w-xl rounded-xl bg-white p-8 text-center font-sans shadow-lg">
      <div className="mb-4 text-base font-medium text-gray-400">
        Delete Event
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
          Are you sure that you want to delete this event?
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            className="rounded-lg bg-gray-100 px-6 py-2 text-base font-medium text-gray-800 transition hover:bg-gray-200"
            onClick={onCancel}
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
  );
}
