"use client";

import { useEffect } from "react";
import type { FC, ReactNode } from "react";
import { LoggerProvider } from "./LoggerProvider";
import { ThemeProvider } from "./ThemeProvider";
import { emit } from "@tauri-apps/api/event";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root provider wrapper for the GeoSource Template app.
 * Wraps children with all global context providers.
 * Zustand stores are accessed directly (no Provider needed in Zustand v5).
 */
const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  useEffect(() => {
    const notifySplash = async () => {
      try {
        await emit("splash-progress", { pct: 85, msg: "Mounting main application..." });
        // Small delay to let children render
        setTimeout(() => {
          emit("main-ready").catch(console.error);
        }, 150);
      } catch (err) {
        console.error("Failed to emit splash events:", err);
      }
    };
    
    notifySplash();
  }, []);

  return (
    <ThemeProvider>
      <LoggerProvider>{children}</LoggerProvider>
    </ThemeProvider>
  );
};

export default AppProviders;

