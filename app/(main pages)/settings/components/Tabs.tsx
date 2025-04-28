"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Tabs() {
  const pathname = usePathname();
  return (
    <div className="mb-14 flex items-center gap-8">
      <Link
        href="/settings/overview"
        className={`block border-b-2 py-1 ${
          pathname === "/settings/overview"
            ? "border-primary text-primary"
            : "text-black-40 border-transparent"
        }`}
      >
        Overview
      </Link>
      <Link
        href="/settings/logs"
        className={`block border-b-2 py-1 ${
          pathname === "/settings/logs"
            ? "border-primary text-primary"
            : "text-black-40 border-transparent"
        }`}
      >
        Logs
      </Link>
    </div>
  );
}
