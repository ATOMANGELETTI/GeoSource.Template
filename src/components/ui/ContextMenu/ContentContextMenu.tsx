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
import { useConfigStore } from "@/lib/store/configStore";

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
  const bindings = useConfigStore((state) => state.bindings.bindings);
  const appInfo = useConfigStore((state) => state.appInfo);

  const reloadShortcut = bindings?.reload || "Ctrl+R";
  const settingsShortcut = bindings?.open_settings || "Ctrl+,";
  const zoomInShortcut = bindings?.zoom_in || "Ctrl+=";
  const zoomOutShortcut = bindings?.zoom_out || "Ctrl+-";
  const resetZoomShortcut = bindings?.reset_zoom || "Ctrl+0";
  const copyShortcut = bindings?.copy || "Ctrl+C";
  const pasteShortcut = bindings?.paste || "Ctrl+V";

  const items = useMemo<ContextMenuEntry[]>(() => {
    const handleReload = async () => {
      if (!inTauri) {
        window.location.reload();
        return;
      }
      try {
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        const win = getCurrentWindow();
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

    const handleZoomIn = () => {
      const root = document.documentElement;
      const currentZoom = parseFloat(root.style.getPropertyValue("--app-zoom") || "1");
      const newZoom = Math.min(2.0, currentZoom + 0.1);
      root.style.setProperty("--app-zoom", newZoom.toString());
      root.style.zoom = newZoom.toString();
    };

    const handleZoomOut = () => {
      const root = document.documentElement;
      const currentZoom = parseFloat(root.style.getPropertyValue("--app-zoom") || "1");
      const newZoom = Math.max(0.5, currentZoom - 0.1);
      root.style.setProperty("--app-zoom", newZoom.toString());
      root.style.zoom = newZoom.toString();
    };

    const handleResetZoom = () => {
      const root = document.documentElement;
      root.style.setProperty("--app-zoom", "1");
      root.style.zoom = "1";
    };

    const handleAbout = () => {
      const name = appInfo?.name || "GeoSource";
      const version = appInfo?.version || "0.1.0";
      const codename = appInfo?.codename || "Melody";
      const desc = appInfo?.description || "GeoSource Tauri Template Desktop Application";
      const author = appInfo?.author || "GeoSource Team";
      const copyright = appInfo?.copyright || "Copyright © 2026 GeoSource. All rights reserved.";
      window.alert(`${name} — v${version} (${codename})\n${desc}\nBy ${author} · ${copyright}\nBuilt with Tauri · Next.js · Rust`);
    };

    return [
      {
        key: "reload",
        icon: RotateCcw,
        label: "Reload",
        shortcut: reloadShortcut,
        onClick: handleReload,
      },
      { key: "div-1", divider: true as const },
      {
        key: "zoom-in",
        icon: ZoomIn,
        label: "Zoom In",
        shortcut: zoomInShortcut,
        onClick: handleZoomIn,
      },
      {
        key: "zoom-out",
        icon: ZoomOut,
        label: "Zoom Out",
        shortcut: zoomOutShortcut,
        onClick: handleZoomOut,
      },
      {
        key: "zoom-reset",
        icon: Maximize2,
        label: "Reset Zoom",
        shortcut: resetZoomShortcut,
        onClick: handleResetZoom,
      },
      { key: "div-2", divider: true as const },
      {
        key: "copy",
        icon: Copy,
        label: "Copy",
        shortcut: copyShortcut,
        onClick: handleCopy,
      },
      {
        key: "paste",
        icon: Clipboard,
        label: "Paste",
        shortcut: pasteShortcut,
        onClick: handlePaste,
      },
      { key: "div-3", divider: true as const },
      {
        key: "settings",
        icon: Settings,
        label: "Preferences",
        shortcut: settingsShortcut,
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
  }, [inTauri, reloadShortcut, settingsShortcut, zoomInShortcut, zoomOutShortcut, resetZoomShortcut, copyShortcut, pasteShortcut, appInfo]);

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
