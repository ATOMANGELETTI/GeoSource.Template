"use client";

import { useEffect, type FC, type ReactNode } from "react";
import { useConfigStore } from "@/lib/store/configStore";

export type ResolvedTheme = "polar-night" | "snow-storm" | "frost" | "aurora";

/**
 * Normalize and resolve arbitrary theme string inputs into one of the 4 supported theme names.
 */
export function normalizeTheme(themeInput: string): ResolvedTheme | "system" {
  const normalized = (themeInput || "").trim().toLowerCase();

  switch (normalized) {
    case "polar-night":
    case "polar_night":
    case "polar night":
    case "dark":
      return "polar-night";

    case "snow-storm":
    case "snow_storm":
    case "snow storm":
    case "light":
      return "snow-storm";

    case "frost":
      return "frost";

    case "aurora":
    case "aroura":
      return "aurora";

    case "system":
      return "system";

    default:
      return "polar-night";
  }
}

/**
 * Resolve system preference to either polar-night (dark) or snow-storm (light).
 */
function resolveSystemTheme(): ResolvedTheme {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "snow-storm";
  }
  return "polar-night";
}

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Client-side ThemeProvider component.
 * Synchronizes application theme setting with root `<html>` element data attributes & classes.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const themeSetting = useConfigStore((state) => state.settings.theme);
  const loadAll = useConfigStore((state) => state.loadAll);

  // Initial configuration fetch on mount
  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Synchronize dynamic theme to document element
  useEffect(() => {
    const rawTheme = themeSetting ?? "polar-night";
    let targetTheme = normalizeTheme(rawTheme);

    if (targetTheme === "system") {
      targetTheme = resolveSystemTheme();
    }

    const root = document.documentElement;
    root.setAttribute("data-theme", targetTheme);

    // Maintain Tailwind / CSS standard dark/light root classes
    if (targetTheme === "snow-storm") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }

    // Handle OS theme changes dynamically if configured to 'system'
    if (normalizeTheme(rawTheme) === "system" && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const activeTheme = resolveSystemTheme();
        root.setAttribute("data-theme", activeTheme);
        if (activeTheme === "snow-storm") {
          root.classList.remove("dark");
          root.classList.add("light");
        } else {
          root.classList.remove("light");
          root.classList.add("dark");
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [themeSetting]);

  return <>{children}</>;
};
