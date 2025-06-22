"use client";

import React, { useState } from "react";
import SideBar from "./navigation/SideBar";
import Navbar from "./navigation/Navbar";
import Notifications from "./navigation/Notifications";
import { useShortcut } from "@/lib/hooks/useShortcut";
import { Session } from "next-auth";
export default function LayoutContainer({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Toggle notifications panel with Ctrl+K
  useShortcut({
    key: "N",
    alt: true,
    callback: () => setNotificationsOpen((prev) => !prev),
  });

  // Toggle sidebar with Ctrl+E
  useShortcut({
    key: "B",
    alt: true,
    callback: () => setSidebarOpen((prev) => !prev),
  });

  return (
    <>
      <SideBar open={sidebarOpen} session={session} />
      <main className="main-layout">
        <Navbar
          sidebarOpen={sidebarOpen}
          notificationsOpen={notificationsOpen}
          setSidebarOpen={setSidebarOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        {children}
      </main>
      <Notifications
        open={notificationsOpen}
        session={session}
        baseUrl={process.env.BASE_URL || ""}
      />
    </>
  );
}
