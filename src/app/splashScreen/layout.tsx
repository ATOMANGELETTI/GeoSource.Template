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
    <>
      <style>{`
        html, body, #__next, main {
          background: transparent !important;
          background-color: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          width: 100vw !important;
          height: 100vh !important;
        }
      `}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "transparent",
          fontFamily: "var(--font-terminus)",
          overflow: "hidden",
          margin: 0,
          padding: "12px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SplashScreenLayout;
