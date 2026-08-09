"use client";

import type { FC } from "react";
import { useConfigStore } from "@/lib/store/configStore";

/**
 * Main window content area.
 * Displays application information loaded dynamically from `appinfo.yaml`.
 * This is the primary canvas for future feature development.
 */
const MainWindowContent: FC = () => {
  const appInfo = useConfigStore((state) => state.appInfo);

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
      {/* App wordmark / description */}
      <p
        style={{
          fontFamily: "var(--font-terminus)",
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--text-secondary)",
          letterSpacing: "0.04em",
          userSelect: "none",
          textAlign: "center",
        }}
      >
        {appInfo?.description || "GeoSource Tauri Template Desktop Application"}
      </p>

      {/* Subtle version badge & codename */}
      <span
        style={{
          fontFamily: "var(--font-terminus)",
          fontSize: "12px",
          fontWeight: 400,
          color: "var(--text-muted)",
          letterSpacing: "0.02em",
          userSelect: "none",
        }}
      >
        v{appInfo?.version || "0.1.0"} • {appInfo?.codename || "Melody"} ({appInfo?.build || "dev"})
      </span>
    </div>
  );
};

export default MainWindowContent;
