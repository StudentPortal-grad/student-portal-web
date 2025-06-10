import Image from "next/image";
import React from "react";

export default function Statistics() {
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-primary-blue flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-semibold">Official Communities</p>
          <Image
            src="/icons/checked-circle.svg"
            alt="users"
            width={24}
            height={24}
          />
        </div>
        <p className="text-2xl font-bold">{Number("4").toLocaleString()}</p>
      </div>

      <div className="bg-primary-purple flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-semibold">User Communities</p>
          <Image
            src="/icons/user-switch.svg"
            alt="user-switch"
            width={24}
            height={24}
          />
        </div>
        <p className="text-2xl font-bold">{Number("5").toLocaleString()}</p>
      </div>

      <div className="bg-primary-blue flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-semibold">All Communities</p>
          <Image
            src="/icons/communities.svg"
            alt="communities"
            width={24}
            height={24}
          />
        </div>
        <p className="text-2xl font-bold">{Number("9").toLocaleString()}</p>
      </div>
    </div>
  );
}
