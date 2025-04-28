import Image from "next/image";
import React from "react";

export default function Statistics() {
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-primary-blue flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-normal">Total Users</p>
          <Image
            src="/icons/users-black.svg"
            alt="users"
            width={24}
            height={24}
          />
        </div>
        <p className="text-2xl font-bold">{Number("2145").toLocaleString()}</p>
      </div>

      <div className="bg-primary-purple flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-normal">Active Events</p>
          <Image
            src="/icons/events-black.svg"
            alt="events"
            width={24}
            height={24}
          />
        </div>
        <p className="text-2xl font-bold">{Number("42").toLocaleString()}</p>
      </div>

      <div className="bg-primary-purple flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-normal">Resources</p>
          <Image src="/icons/book.svg" alt="resources" width={24} height={24} />
        </div>
        <p className="text-2xl font-bold">{Number("857").toLocaleString()}</p>
      </div>

      <div className="bg-primary-blue flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-normal">Communities</p>
          <Image
            src="/icons/communities-black.svg"
            alt="communities"
            width={24}
            height={24}
          />
        </div>
        <p className="text-2xl font-bold">{Number("124").toLocaleString()}</p>
      </div>
    </div>
  );
}
