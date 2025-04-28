"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TooltipWrapper from "../TooltipWrapper";
import LogoutButton from "../buttons/LogoutButton";
import { useKeyboardShortcut } from "@/lib/utils";

export default function SideBar({ open = true }: { open: boolean }) {
  const pathname = usePathname();

  const pages = [
    {
      name: "overview",
      shortcut: "O",
      path: "/overview",
      acceptedPaths: ["/overview"],
      icon: "/icons/overview.svg",
    },
    {
      name: "Users",
      shortcut: "U",
      path: "/users",
      acceptedPaths: ["/users"],
      icon: "/icons/users.svg",
    },
    {
      name: "Communities",
      shortcut: "C",
      path: "/communities",
      acceptedPaths: ["/communities"],
      icon: "/icons/communities.svg",
    },
    {
      name: "Resources",
      shortcut: "R",
      path: "/resources",
      acceptedPaths: ["/resources"],
      icon: "/icons/resources.svg",
    },
    {
      name: "Events",
      shortcut: "E",
      path: "/events",
      acceptedPaths: ["/events"],
      icon: "/icons/events.svg",
    },
    {
      name: "AI",
      shortcut: "A",
      path: "/ai",
      acceptedPaths: ["/ai"],
      icon: "/icons/ai.svg",
    },
    {
      name: "Settings",
      shortcut: "S",
      path: "/settings/overview",
      acceptedPaths: ["/settings/overview", "/settings/logs"],
      icon: "/icons/settings.svg",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    const cleanup = useKeyboardShortcut({ key: "O", alt: true }, () => {
      router.push("/overview");
    });
    return cleanup;
  }, []);

  useEffect(() => {
    const cleanup = useKeyboardShortcut({ key: "U", alt: true }, () => {
      router.push("/users");
    });
    return cleanup;
  }, []);

  useEffect(() => {
    const cleanup = useKeyboardShortcut({ key: "C", alt: true }, () => {
      router.push("/communities");
    });
    return cleanup;
  }, []);

  useEffect(() => {
    const cleanup = useKeyboardShortcut({ key: "R", alt: true }, () => {
      router.push("/resources");
    });
    return cleanup;
  }, []);

  useEffect(() => {
    const cleanup = useKeyboardShortcut({ key: "E", alt: true }, () => {
      router.push("/events");
    });
    return cleanup;
  }, []);

  useEffect(() => {
    const cleanup = useKeyboardShortcut({ key: "A", alt: true }, () => {
      router.push("/ai");
    });
    return cleanup;
  }, []);

  useEffect(() => {
    const cleanup = useKeyboardShortcut({ key: "S", alt: true }, () => {
      router.push("/settings/overview");
    });
    return cleanup;
  }, []);

  return (
    <nav className="border-black-10 flex flex-col border-r-1 px-4 py-7">
      <div className="flex-center mb-6.5 gap-2">
        <Image
          src="/logos/logo-black.svg"
          alt="logo"
          width={32.1}
          height={32.69}
        />
        {open ? (
          <span className="text-black-brand text-lg font-semibold capitalize">
            student portal
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        {pages.map((page) => (
          <TooltipWrapper
            content={`${page.name} (alt + ${page.shortcut})`}
            key={page.name}
            direction="right"
            disabled={open}
          >
            <Link
              href={page.path}
              className={`hover:bg-black-5 flex items-center gap-3 rounded-[8px] p-3 transition-colors duration-300 ${page.acceptedPaths.includes(pathname) ? "bg-black-5" : ""}`}
            >
              <Image src={page.icon} alt={page.name} width={24} height={24} />
              {open ? (
                <span className="text-black-brand text-sm font-normal capitalize">
                  {page.name}
                </span>
              ) : null}
            </Link>
          </TooltipWrapper>
        ))}
      </div>

      <div
        className={`mt-auto flex flex-col ${open ? "" : "items-center"} gap-2`}
      >
        <TooltipWrapper content="John Doe" direction="right" disabled={open}>
          <div className={`flex items-center gap-2 ${open ? "ml-2" : ""}`}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {open ? (
              <span className="text-black-brand text-sm font-normal capitalize">
                John Doe
              </span>
            ) : null}
          </div>
        </TooltipWrapper>
        <TooltipWrapper content="Logout" direction="right" disabled={open}>
          <LogoutButton open={open} />
        </TooltipWrapper>
      </div>
    </nav>
  );
}
