"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Image
          src="/pics/404.svg"
          alt="Error"
          width={200}
          height={200}
          className="mx-auto"
        />

        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>

          <p className="text-gray-600">
            We encountered an error while loading the events. This might be due
            to a temporary issue or network problem.
          </p>

          {error.message && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <strong>Error details:</strong> {error.message}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 font-medium text-white transition-colors"
          >
            Try Again
          </button>

          <Link
            href="/events"
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back to Events
          </Link>

          <Link
            href="/overview"
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>If the problem persists, please contact support.</p>
        {error.digest && <p className="mt-2">Error ID: {error.digest}</p>}
      </div>
    </div>
  );
}
