"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function QuickActions() {
  return (
    <div className="bg-primary-light w-full rounded-2xl p-6">
      <p className="text-black-100 text-lg font-semibold">Quick Actions</p>
      <div className="mx-auto my-11 grid w-fit grid-cols-1 gap-4 md:grid-cols-2">
        <QuickActionButton
          icon="/icons/upload-white.svg"
          text="Upload Resource"
          destination="/resources/new"
        />
        <QuickActionButton
          icon="/icons/event-white.svg"
          text="Create Event"
          destination="/events/new"
        />
        <QuickActionButton
          icon="/icons/users-white.svg"
          text="Manage Groups"
          destination="/communities/new"
        />
        <QuickActionButton
          icon="/icons/ai-white.svg"
          text="Retrain Ai"
          destination="/ai"
        />
      </div>
    </div>
  );
}

function QuickActionButton({
  icon,
  text,
  destination,
}: {
  icon: string;
  text: string;
  destination: string;
}) {
  const router = useRouter();
  return (
    <button
      className="bg-black-brand flex cursor-pointer items-center justify-center gap-2 rounded-[8px] px-8 py-4 text-white"
      onClick={() => router.push(destination)}
    >
      <Image src={icon} alt={text} width={16} height={16} />
      <p className="text-sm font-normal">{text}</p>
    </button>
  );
}
