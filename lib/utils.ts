import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type KeyCombo = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

export function useKeyboardShortcut(keyCombo: KeyCombo, callback: () => void) {
  const handleKeyDown = (event: KeyboardEvent) => {
    const { key, ctrl, shift, alt, meta } = keyCombo;

    if (
      event.key.toLowerCase() === key.toLowerCase() &&
      !!ctrl === event.ctrlKey &&
      !!shift === event.shiftKey &&
      !!alt === event.altKey &&
      !!meta === event.metaKey
    ) {
      event.preventDefault();
      callback();
    }
  };

  // Add event listener when component mounts
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeyDown);
  }

  // Return cleanup function
  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", handleKeyDown);
    }
  };
}
