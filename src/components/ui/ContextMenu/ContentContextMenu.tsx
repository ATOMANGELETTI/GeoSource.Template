"use client";

import { type FC, useMemo } from "react";
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Clipboard,
  Settings,
  Info,
} from "lucide-react";
import { ContextMenuGate, type ContextMenuEntry } from "@/components/ui/ContextMenu";
import { isTauri } from "@/lib/utils";

interface ContentContextMenuProps {
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
}

/**
 * Right-click context menu for the main content area.
 *
 * Items:
 *   Reload           Ctrl+R
 *   ────────────────────────
 *   Zoom In          Ctrl++
 *   Zoom Out         Ctrl+–
 *   Reset Zoom       Ctrl+0
 *   ────────────────────────
 *   Copy             Ctrl+C
 *   Paste            Ctrl+V
 *   ────────────────────────
 *   Preferences      Ctrl+,
 *   About GeoSource
 */
const ContentContextMenu: FC<ContentContextMenuProps> = ({ open, x, y, onClose }) => {
  const inTauri = isTauri();

  const items = useMemo<ContextMenuEntry[]>(() => {
    const handleReload = async () => {
      if (!inTauri) {
        window.location.reload();
        return;
      }
      try {
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        // Reload the webview
        const win = getCurrentWindow();
        // Tauri v2 webview window reload
        await (win as unknown as { webview?: { reload?: () => Promise<void> } }).webview?.reload?.();
      } catch {
        window.location.reload();
      }
    };

    const handleOpenSettings = async () => {
      if (!inTauri) return;
      try {
        const { openConfigDir } = await import("@/lib/config");
        await openConfigDir();
      } catch {
        /* no-op */
      }
    };

    const handleCopy = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        void navigator.clipboard.writeText(selection.toString());
      }
    };

    const handlePaste = async () => {
      try {
        const text = await navigator.clipboard.readText();
        const active = document.activeElement as HTMLElement & {
          value?: string;
          setRangeText?: (text: string) => void;
        };
        if (active && "value" in active && typeof active.value === "string") {
          active.setRangeText?.(text);
        }
      } catch {
        /* clipboard read requires focus / permission */
      }
    };

    const handleAbout = () => {
      // Simple info alert — no external dialog plugin required
      window.alert("GeoSource Template — v0.1.0\nBuilt with Tauri · Next.js · Rust");
    };

    return [
      {
        key: "reload",
        icon: RotateCcw,
        label: "Reload",
        shortcut: "Ctrl+R",
        onClick: handleReload,
      },
      { key: "div-1", divider: true as const },
      {
        key: "zoom-in",
        icon: ZoomIn,
        label: "Zoom In",
        shortcut: "Ctrl++",
        onClick: () => { /* browser zoom is OS-level; label only */ },
        disabled: true,
      },
      {
        key: "zoom-out",
        icon: ZoomOut,
        label: "Zoom Out",
        shortcut: "Ctrl+–",
        onClick: () => { /* label only */ },
        disabled: true,
      },
      {
        key: "zoom-reset",
        icon: Maximize2,
        label: "Reset Zoom",
        shortcut: "Ctrl+0",
        onClick: () => { /* label only */ },
        disabled: true,
      },
      { key: "div-2", divider: true as const },
      {
        key: "copy",
        icon: Copy,
        label: "Copy",
        shortcut: "Ctrl+C",
        onClick: handleCopy,
      },
      {
        key: "paste",
        icon: Clipboard,
        label: "Paste",
        shortcut: "Ctrl+V",
        onClick: handlePaste,
      },
      { key: "div-3", divider: true as const },
      {
        key: "settings",
        icon: Settings,
        label: "Preferences",
        shortcut: "Ctrl+,",
        onClick: handleOpenSettings,
        disabled: !inTauri,
      },
      {
        key: "about",
        icon: Info,
        label: "About GeoSource",
        onClick: handleAbout,
      },
    ];
  }, [inTauri]);

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

export default ContentContextMenu;
