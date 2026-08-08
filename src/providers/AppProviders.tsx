"use client";

import type { FC, ReactNode } from "react";
import { LoggerProvider } from "./LoggerProvider";
import { ThemeProvider } from "./ThemeProvider";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root provider wrapper for the GeoSource Template app.
 * Wraps children with all global context providers.
 * Zustand stores are accessed directly (no Provider needed in Zustand v5).
 */
const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <LoggerProvider>{children}</LoggerProvider>
    </ThemeProvider>
  );
};

export default AppProviders;

