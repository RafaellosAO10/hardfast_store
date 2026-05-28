import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/theme";

/** Applies the persisted theme class to <html> and returns whether we've mounted. */
export function ThemeManager() {
  const theme = useThemeStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);
  return null;
}

export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
