"use client";

import React from "react";
import Image from "next/image";
import TooltipWrapper from "../TooltipWrapper";

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

  return (
    <TooltipWrapper content={`Theme: ${theme}`}>
      <div
        className={`flex-center hover:bg-black-5 cursor-pointer rounded-full p-2 transition-colors duration-300`}
        onClick={handleThemeClick}
      >
        <Image src={themeIcons[theme]} alt={theme} width={20} height={20} />
      </div>
    </TooltipWrapper>
  );
}
