"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeButton from "../buttons/ThemeButton";
import TooltipWrapper from "../TooltipWrapper";

export default function Navbar({
  sidebarOpen,
  notificationsOpen,
  setSidebarOpen,
  setNotificationsOpen,
}: {
  sidebarOpen: boolean;
  notificationsOpen: boolean;
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setNotificationsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="border-black-10 sticky top-0 z-10 border-b-1 bg-white px-7 py-5.5">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex-center gap-2">
          <span className="text-black-40 text-sm font-normal capitalize">
            Dashboard
          </span>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={segment}>
              <span className="text-black-40 text-sm font-normal capitalize">
                /
              </span>
              <span
                className={`text-sm font-normal capitalize ${
                  index + 1 !== pathSegments.length
                    ? "text-black-40"
                    : "text-black-100"
                }`}
              >
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* controls */}
        <div className="flex items-center gap-2">
          <ThemeButton />
          <TooltipWrapper content="Notifications: alt + N">
            <div
              className={`flex-center hover:bg-black-5 cursor-pointer rounded-full p-2 transition-colors duration-300 ${notificationsOpen ? "bg-black-5" : ""}`}
              onClick={() => setNotificationsOpen((prev) => !prev)}
            >
              <Image
                src="/icons/notifications.svg"
                alt="notification menu toggle"
                width={20}
                height={20}
              />
            </div>
          </TooltipWrapper>
          <TooltipWrapper content="Sidebar: alt + B">
            <div
              className={`flex-center hover:bg-black-5 cursor-pointer rounded-full p-2 transition-colors duration-300 ${sidebarOpen ? "bg-black-5" : ""}`}
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <Image
                src="/icons/sidebar.svg"
                alt="sidebar toggle"
                width={20}
                height={20}
              />
            </div>
          </TooltipWrapper>
        </div>
      </div>
    </header>
  );
}
