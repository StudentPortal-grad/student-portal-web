"use client";

import React, { useState } from "react";
import SideBar from "./navigation/SideBar";
import Navbar from "./navigation/Navbar";
import Notifications from "./navigation/Notifications";

export default function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
