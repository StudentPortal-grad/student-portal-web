"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import TooltipWrapper from "../TooltipWrapper";
import { useKeyboardShortcut } from "@/lib/utils";
import { useShortcut } from "@/lib/hooks/useShortcut";

export default function ThemeButton() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">(
    "light",
  );

  const themeIcons = {
    light: "/icons/sun.svg",
    dark: "/icons/moon.svg",
    system: "/icons/system.svg",
  };

  const handleThemeClick = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  useShortcut({
    key: "T",
    alt: true,
    callback: handleThemeClick,
  });

  return (
    <TooltipWrapper content={`Theme: ${theme} (alt + T)`}>
      <div
        className={`flex-center hover:bg-black-5 cursor-pointer rounded-full p-2 transition-colors duration-300`}
        onClick={handleThemeClick}
      >
        <Image src={themeIcons[theme]} alt={theme} width={20} height={20} />
      </div>
    </TooltipWrapper>
  );
}
