"use client";

import React from "react";
import Image from "next/image";

export default function ThemeButton() {
  const [theme, setTheme] = React.useState<"sun" | "moon" | "computer">("sun");

  const themeIcons = {
    sun: "/icons/sun.svg",
    moon: "/icons/moon.svg",
    computer: "/icons/computer.svg",
  };

  const handleThemeClick = () => {
    setTheme((prev) => {
      if (prev === "sun") return "moon";
      if (prev === "moon") return "computer";
      return "sun";
    });
  };

  return (
    <div
      className={`flex-center hover:bg-black-5 cursor-pointer rounded-full p-2 transition-colors duration-300`}
      onClick={handleThemeClick}
    >
      <Image src={themeIcons[theme]} alt={theme} width={20} height={20} />
    </div>
  );
}
