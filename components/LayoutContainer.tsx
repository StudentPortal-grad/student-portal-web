"use client";

import React, { useEffect, useState } from "react";
import SideBar from "./navigation/SideBar";
import Navbar from "./navigation/Navbar";
import Notifications from "./navigation/Notifications";
import { useKeyboardShortcut } from "@/lib/utils";

export default function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Toggle notifications panel with Ctrl+K
  useEffect(() => {
    const cleanup = useKeyboardShortcut({ key: "k", ctrl: true }, () => {
      setNotificationsOpen((prev) => !prev);
    });
    return cleanup;
  }, []);

  // Toggle sidebar with Ctrl+E
  useEffect(() => {
    const cleanup = useKeyboardShortcut({ key: "E", ctrl: true }, () => {
      setSidebarOpen((prev) => !prev);
    });
    return cleanup;
  }, []);
  return (
    <>
      <SideBar open={sidebarOpen} />
      <main className="main-layout">
        <Navbar
          sidebarOpen={sidebarOpen}
          notificationsOpen={notificationsOpen}
          setSidebarOpen={setSidebarOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
        {children}
      </main>
      <Notifications open={notificationsOpen} />
    </>
  );
}
