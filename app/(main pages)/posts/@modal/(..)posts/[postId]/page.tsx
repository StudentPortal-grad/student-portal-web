import React from "react";
import DiscussionsForm from "../../../components/DiscussionsForm";

export default function page() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <DiscussionsForm />
    </div>
  );
}
