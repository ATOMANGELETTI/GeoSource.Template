"use client";

import type { FC } from "react";
import TrafficLights from "./TrafficLights";
import { useTauriWindow } from "@/hooks/useTauriWindow";

interface TitlebarProps {
  title?: string;
}

/**
 * macOS-style custom titlebar for the frameless Tauri window.
 *
 * Layout:
 *   [ TrafficLights ] -------- [ Centered Title ] -------- [ Spacer (equal to traffic lights) ]
 *
 * The entire bar has `data-tauri-drag-region` so users can drag the window.
 * Traffic lights are in a `no-drag` sub-region to capture click events.
 */
const Titlebar: FC<TitlebarProps> = ({ title = "GeoSource Template" }) => {
  const { minimize, maximize, close } = useTauriWindow();

  return (
    <header
      id="titlebar"
      data-tauri-drag-region
      aria-label="Window titlebar"
      style={{
        height: "var(--titlebar-height)",
        backgroundColor: "var(--titlebar-bg)",
        borderBottom: "1px solid var(--titlebar-border)",
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexShrink: 0,
        position: "relative",
        // Allow drag on the header element itself
        WebkitAppRegion: "drag",
      } as React.CSSProperties}
    >
      {/* Left: Traffic Lights — absolutely positioned to allow true centering of title */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <TrafficLights
          onClose={close}
          onMinimize={minimize}
          onMaximize={maximize}
        />
      </div>

      {/* Center: App Title */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-terminus)",
            fontSize: "12px",
            fontWeight: 400,
            color: "var(--text-secondary)",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {title}
        </span>
      </div>
    </header>
  );
};

export default Titlebar;
