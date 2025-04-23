import React from "react";

export default function Notifications({ open }: { open: boolean }) {
  return open ? (
    <div className="border-black-10 w-[300px] border-l-1 px-4 py-7">
      notifications
    </div>
  ) : null;
}
