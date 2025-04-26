import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import TooltipWrapper from "../TooltipWrapper";

const notifications = [
  {
    icon: "/icons/bug.svg",
    message: "You have a bug that needs t...asdasdasdasdasd",
    time: "Just now",
  },
  {
    icon: "/icons/users.svg",
    message: "New user registered",
    time: "59 minutes ago",
  },
  {
    icon: "/icons/bug.svg",
    message: "You have a bug that needs t...",
    time: "12 hours ago",
  },
  {
    icon: "/icons/broadcast.svg",
    message: "Andi Lane subscribed to you",
    time: "Today, 11:59 AM",
  },
];

const activities = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    fallback: "JD",
    message: "Edited the details of Project X",
    time: "Just now",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    fallback: "AB",
    message: "Released a new version",
    time: "59 minutes ago",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    fallback: "CD",
    message: "Submitted a bug",
    time: "12 hours ago",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    fallback: "EF",
    message: "Modified A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    fallback: "EF",
    message: "Modified A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    fallback: "EF",
    message: "Modified A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    fallback: "EF",
    message: "Modified A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    fallback: "EF",
    message: "Modified A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    fallback: "GH",
    message: "Deleted a page in Project X",
    time: "Feb 2, 2023",
  },
];

export default function Notifications({ open }: { open: boolean }) {
  return open ? (
    <div className="border-black-10 text-black-100 flex h-full w-[300px] flex-col gap-6 border-l-1 bg-white px-4 py-7 text-sm">
      {/* Notifications Section */}
      <div>
        <h2 className="mb-2 text-base font-semibold">Notifications</h2>
        <div className="flex max-h-[400px] flex-col gap-2 overflow-auto">
          {notifications.map((n, i) => (
            <div className="flex items-start gap-3 py-2" key={i}>
              <div className="bg-black-5 flex h-8 w-8 items-center justify-center rounded-full">
                <Image src={n.icon} alt="icon" width={20} height={20} />
              </div>
              <div className="flex-1">
                <TooltipWrapper content={n.message} direction="bottom">
                  <div className="text-black-100 max-w-[200px] truncate text-sm leading-tight font-normal">
                    {n.message}
                  </div>
                </TooltipWrapper>
                <div className="text-black-40 mt-0.5 text-xs">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Activities Section */}
      <div>
        <h2 className="mb-2 text-base font-semibold">Activities</h2>
        <div className="flex max-h-[400px] flex-col gap-0.5 overflow-auto">
          {activities.map((a, i) => (
            <React.Fragment key={i}>
              <div className="flex items-start gap-3 py-1">
                <Avatar>
                  <AvatarImage src={a.avatar} alt={a.fallback} />
                  <AvatarFallback>{a.fallback}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <TooltipWrapper content={a.message} direction="bottom">
                    <div className="text-black-100 w-full truncate text-sm leading-tight font-normal">
                      {a.message}
                    </div>
                  </TooltipWrapper>
                  <div className="text-black-40 mt-0.5 text-xs">{a.time}</div>
                </div>
              </div>
              {i < activities.length - 1 && (
                <div className="bg-black-10 mb-1 min-h-3.5 w-0.25 translate-x-4"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
