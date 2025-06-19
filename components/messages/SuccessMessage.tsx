import { CheckCircle } from "lucide-react";
import React from "react";

export default function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
      <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
      <p className="text-sm text-green-600">{message}</p>
    </div>
  );
}
