import { logout } from "@/lib/actions/logout";
import Image from "next/image";
import React from "react";

export default function LogoutButton({ open }: { open: boolean }) {
  return (
    <div
      className="group hover:bg-black-5 flex w-full cursor-pointer items-center gap-3 rounded-[8px] p-3 transition-colors"
      onClick={async () => {
        await logout();
      }}
    >
      <Image
        src="/icons/logout.svg"
        alt="logout"
        width={24}
        height={24}
        className="[&>svg]:text-black-brand"
      />
      {open ? (
        <span className="text-black-brand text-sm font-normal capitalize transition-colors">
          Logout
        </span>
      ) : null}
    </div>
  );
}
