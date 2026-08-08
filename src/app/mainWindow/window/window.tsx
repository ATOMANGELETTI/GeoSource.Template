"use client";

import type { FC } from "react";

/**
 * Main window content area.
 * Displays the "Tauri Template" placeholder text centered in the content region.
 * This is the primary canvas for future feature development.
 */
const MainWindowContent: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        gap: "12px",
        padding: "32px",
      }}
    >
      {/* App wordmark */}
      <p
        style={{
          fontFamily: "var(--font-terminus)",
          fontSize: "13px",
          fontWeight: 400,
          color: "var(--text-secondary)",
          letterSpacing: "0.04em",
          userSelect: "none",
        }}
      >
        Tauri Template
      </p>

      {/* Subtle version badge */}
      <span
        style={{
          fontFamily: "var(--font-terminus)",
          fontSize: "11px",
          fontWeight: 400,
          color: "var(--text-muted)",
          letterSpacing: "0.02em",
          userSelect: "none",
        }}
      >
        v0.1.0
      </span>
    </div>
  );
};

export default MainWindowContent;
