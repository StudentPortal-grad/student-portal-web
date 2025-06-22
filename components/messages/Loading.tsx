import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading({
  message,
  description,
}: {
  message: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="mb-4 flex items-center gap-3">
        <Loader2 className="text-primary h-6 w-6 animate-spin" />
        <span className="text-lg font-medium text-gray-700">{message}</span>
      </div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
}
