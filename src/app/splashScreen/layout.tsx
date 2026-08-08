"use client";

import type { FC, ReactNode } from "react";

interface SplashScreenLayoutProps {
  children?: ReactNode;
}

/**
 * Splash screen layout — placeholder for future splash implementation.
 * Currently renders children directly.
 */
const SplashScreenLayout: FC<SplashScreenLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "var(--bg-app)",
        fontFamily: "var(--font-terminus)",
      }}
    >
      {children}
    </div>
  );
};

export default SplashScreenLayout;
