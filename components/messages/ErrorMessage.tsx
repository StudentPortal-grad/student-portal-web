import { AlertCircle } from "lucide-react";
import React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
      <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}
