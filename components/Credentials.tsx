"use client";
import React from "react";

export default function Credentials() {
  return (
    <div className="absolute bottom-0 left-0 flex w-full items-center justify-center py-12">
      <span className="text-black-40 text-xs font-normal">
        © {new Date().getFullYear()} Student Portal
      </span>
    </div>
  );
}
