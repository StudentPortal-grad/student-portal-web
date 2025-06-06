import { useEffect } from "react";
import { useKeyboardShortcut } from "../utils";

type ShortcutOptions = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  callback: () => void;
};

export function useShortcut(options: ShortcutOptions) {
  const { callback, ...keyCombo } = options;

  useEffect(() => {
    const cleanup = useKeyboardShortcut(keyCombo, callback);
    return cleanup;
  }, [callback, keyCombo]);
}
