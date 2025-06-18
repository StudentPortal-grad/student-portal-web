import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="bg-primary-light flex min-h-[280px] flex-col items-center justify-center rounded-2xl p-6">
      <Image
        src="/logos/logo-black.svg"
        alt="Loading Logo"
        width={60}
        height={60}
        className="animate-spin-impressive mb-4 h-16 w-16 scale-105 drop-shadow-lg"
      />
      <p className="text-base font-medium text-gray-700">
        Loading chart data...
      </p>
    </div>
  );
}
