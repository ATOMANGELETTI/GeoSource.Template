"use client";

import type { FC } from "react";
import TrafficLights from "./TrafficLights";
import { useTauriWindow } from "@/hooks/useTauriWindow";
import { useContextMenu } from "@/hooks/useContextMenu";
import TitlebarContextMenu from "./TitlebarContextMenu";

interface TitlebarProps {
  title?: string;
}

/**
 * macOS-style custom titlebar for the frameless Tauri window.
 *
 * Layout:
 *   [ TrafficLights ] -------- [ Centered Title ] -------- [ Spacer ]
 *
 * Behavior:
 *   - Left-click drag: Moves window natively via `startDragging()`
 *   - Double left-click: Toggles maximize / restore
 *   - Right-click: Opens custom TitlebarContextMenu styled identically to ContentContextMenu
 */
const Titlebar: FC<TitlebarProps> = ({ title = "GeoSource Template" }) => {
  const { minimize, maximize, close, isMaximized } = useTauriWindow();
  const { menuState, handleContextMenu, close: closeMenu } = useContextMenu();

  const handleMouseDown = async (e: React.MouseEvent) => {
    // Only initiate window drag on primary (left) click
    if (e.button === 0) {
      try {
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        await getCurrentWindow().startDragging();
      } catch {
        /* no-op in non-Tauri */
      }
    }
  };

  const handleDoubleClick = async () => {
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      await getCurrentWindow().toggleMaximize();
    } catch {
      /* no-op in non-Tauri */
    }
  };

  return (
    <>
      <header
        id="titlebar"
        aria-label="Window titlebar"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        style={{
          height: "var(--titlebar-height)",
          backgroundColor: "var(--titlebar-bg)",
          borderBottom: "1px solid var(--titlebar-border)",
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexShrink: 0,
          position: "relative",
          userSelect: "none",
          WebkitUserSelect: "none",
          cursor: "default",
        }}
      >
        {/* Left: Traffic Lights — stop propagation to avoid dragging/context menu */}
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
          onMouseDown={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
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

      {/* Custom Titlebar right-click context menu — portal */}
      <TitlebarContextMenu
        open={menuState.open}
        x={menuState.x}
        y={menuState.y}
        onClose={closeMenu}
        onMinimize={minimize}
        onMaximize={maximize}
        onClose_window={close}
        isMaximized={isMaximized}
      />
    </>
  );
};

export default Titlebar;
