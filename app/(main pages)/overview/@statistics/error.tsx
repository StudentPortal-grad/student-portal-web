"use client";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { message?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-primary-light flex min-h-[120px] flex-col items-center justify-center rounded-2xl p-6">
      <svg
        className="mb-3 h-12 w-12 text-red-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01"
        />
      </svg>
      <h2 className="mb-1 text-lg font-bold text-red-600">
        {error?.message || "Failed to load statistics."}
      </h2>
      <button
        onClick={() => reset()}
        className="rounded bg-red-500 px-4 py-1.5 text-sm text-white transition-colors hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );
}
