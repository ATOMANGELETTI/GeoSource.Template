"use client";

import { type FC, useMemo } from "react";
import { Minus, Square, Maximize2, X, Move, RotateCcw, Scaling } from "lucide-react";
import { ContextMenuGate, type ContextMenuEntry } from "@/components/ui/ContextMenu";
import { isTauri } from "@/lib/utils";

interface TitlebarContextMenuProps {
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
  /** Window control callbacks from useTauriWindow */
  onMinimize: () => void | Promise<void>;
  onMaximize: () => void | Promise<void>;
  onClose_window: () => void | Promise<void>;
  isMaximized: boolean;
}

/**
 * Right-click context menu for the custom window titlebar.
 * Styled consistently with the content area right-click menu and tray menu.
 *
 * Items:
 *   Restore
 *   Move
 *   Size
 *   ─────────────────
 *   Minimize    Ctrl+M
 *   Maximize    Ctrl+↑
 *   ─────────────────
 *   Close       Alt+F4  (danger)
 */
const TitlebarContextMenu: FC<TitlebarContextMenuProps> = ({
  open,
  x,
  y,
  onClose,
  onMinimize,
  onMaximize,
  onClose_window,
  isMaximized,
}) => {
  const inTauri = isTauri();

  const items = useMemo<ContextMenuEntry[]>(() => {
    const handleMove = async () => {
      if (!inTauri) return;
      try {
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        await getCurrentWindow().startDragging();
      } catch {
        /* no-op outside Tauri */
      }
    };

    return [
      {
        key: "restore",
        icon: RotateCcw,
        label: "Restore",
        onClick: onMaximize,
        disabled: !inTauri || !isMaximized,
      },
      {
        key: "move",
        icon: Move,
        label: "Move",
        onClick: handleMove,
        disabled: !inTauri || isMaximized,
      },
      {
        key: "size",
        icon: Scaling,
        label: "Size",
        disabled: true,
      },
      { key: "div-1", divider: true as const },
      {
        key: "minimize",
        icon: Minus,
        label: "Minimize",
        shortcut: "Ctrl+M",
        onClick: onMinimize,
        disabled: !inTauri,
      },
      {
        key: "maximize",
        icon: isMaximized ? Square : Maximize2,
        label: "Maximize",
        shortcut: "Ctrl+↑",
        onClick: onMaximize,
        disabled: !inTauri || isMaximized,
      },
      { key: "div-2", divider: true as const },
      {
        key: "close",
        icon: X,
        label: "Close",
        shortcut: "Alt+F4",
        onClick: onClose_window,
        danger: true,
        disabled: !inTauri,
      },
    ];
  }, [inTauri, isMaximized, onMinimize, onMaximize, onClose_window]);

  return (
    <ContextMenuGate
      open={open}
      x={x}
      y={y}
      items={items}
      onClose={onClose}
    />
  );
};

export default TitlebarContextMenu;
