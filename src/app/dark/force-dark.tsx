"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Force the dark theme while inside /dark/* routes.
 * Restores the user's previous theme on unmount.
 */
export default function ForceDarkTheme() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const previous = theme;
    setTheme("dark");
    return () => {
      if (previous && previous !== "dark") setTheme(previous);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
