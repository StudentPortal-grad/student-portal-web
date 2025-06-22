import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import TooltipWrapper from "../TooltipWrapper";
import { Session } from "next-auth";

// const notifications = [
//   {
//     icon: "/icons/bug.svg",
//     message: "You have a bug that needs t...asdasdasdasdasd",
//     time: "Just now",
//   },
//   {
//     icon: "/icons/users.svg",
//     message: "New user registered",
//     time: "59 minutes ago",
//   },
//   {
//     icon: "/icons/bug.svg",
//     message: "You have a bug that needs t...",
//     time: "12 hours ago",
//   },
//   {
//     icon: "/icons/broadcast.svg",
//     message: "Andi Lane subscribed to you",
//     time: "Today, 11:59 AM",
//   },
// ];

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

// Helper to pick icon based on notification type
function getNotificationIcon(type: string) {
  switch (type) {
    case "new_event":
      return "/icons/events.svg";
    case "resource_reported":
      return "/icons/bug.svg";
    case "new_resource_shared":
      return "/icons/resources.svg";
    case "STATUS_CHANGED":
      return "/icons/user-switch.svg";
    default:
      return "/icons/notifications.svg";
  }
}

// Helper to format time (simple version)
function formatTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}

export default function Notifications({
  open,
  session,
  baseUrl,
}: {
  open: boolean;
  session: Session | null;
  baseUrl: string;
}) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchNotifications = async () => {
      if (!session?.token) {
        setError("No authentication token available");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/notifications`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch notifications");
        }

        const mapped = (data.data?.notifications || []).map((n: any) => ({
          icon: getNotificationIcon(n.type),
          message: n.content,
          time: formatTime(n.createdAt),
        }));

        setNotifications(mapped);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch notifications",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    intervalId = setInterval(fetchNotifications, 2000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [session, baseUrl]);

  return open ? (
    <div className="border-black-10 text-black-100 flex h-full w-[300px] flex-col gap-6 border-l-1 bg-white px-4 py-7 text-sm">
      {/* Notifications Section */}
      <div>
        <h2 className="mb-2 text-base font-semibold">Notifications</h2>
        <div className="flex h-full flex-col gap-2 overflow-auto">
          {loading && notifications.length === 0 ? (
            <div className="text-black-40 py-4 text-center">
              <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
              Loading notifications...
            </div>
          ) : error ? (
            <div className="py-4 text-center text-xs text-red-500">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="text-black-40 py-4 text-center">
              No notifications found.
            </div>
          ) : (
            notifications.map((n, i) => (
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
            ))
          )}
        </div>
      </div>
      {/* Activities Section */}
      {/* <div>
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
      </div> */}
    </div>
  ) : null;
}
