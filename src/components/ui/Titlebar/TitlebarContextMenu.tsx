"use client";

import { type FC, useMemo } from "react";
import { Minus, Square, Maximize2, X, Move, RotateCcw, Scaling } from "lucide-react";
import { ContextMenuGate, type ContextMenuEntry } from "@/components/ui/ContextMenu";
import { isTauri } from "@/lib/utils";
import { useConfigStore } from "@/lib/store/configStore";

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
  const bindings = useConfigStore((state) => state.bindings.bindings);
  const quitShortcut = bindings?.quit || "Alt+F4";
  const toggleWindowShortcut = bindings?.toggle_window || "Ctrl+M";
  const toggleMaximizeShortcut = bindings?.toggle_maximize || "Ctrl+Up";

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
        label: "Toggle Window",
        shortcut: toggleWindowShortcut,
        onClick: onMinimize,
        disabled: !inTauri,
      },
      {
        key: "maximize",
        icon: isMaximized ? Square : Maximize2,
        label: "Toggle Maximize",
        shortcut: toggleMaximizeShortcut,
        onClick: onMaximize,
        disabled: !inTauri,
      },
      { key: "div-2", divider: true as const },
      {
        key: "close",
        icon: X,
        label: "Close",
        shortcut: quitShortcut,
        onClick: onClose_window,
        danger: true,
        disabled: !inTauri,
      },
    ];
  }, [inTauri, isMaximized, onMinimize, onMaximize, onClose_window, quitShortcut, toggleWindowShortcut, toggleMaximizeShortcut]);

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
