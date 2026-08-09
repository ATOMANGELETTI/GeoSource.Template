"use client";

import { useEffect, useCallback } from "react";
import { useConfigStore } from "@/lib/store/configStore";
import { isTauri } from "@/lib/utils";
import { openConfigDir } from "@/lib/config";

interface ParsedAccelerator {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
  key: string;
}

/**
 * Parse an accelerator string (e.g. "Ctrl+B", "Ctrl+Shift+P", "Alt+F4")
 * into individual modifier flags and normalized key string.
 */
export function parseAccelerator(accelerator: string): ParsedAccelerator {
  const parts = accelerator.split("+").map((p) => p.trim());
  let ctrlKey = false;
  let shiftKey = false;
  let altKey = false;
  let metaKey = false;
  let key = "";

  for (const part of parts) {
    const lower = part.toLowerCase();
    if (lower === "ctrl" || lower === "control") {
      ctrlKey = true;
    } else if (lower === "shift") {
      shiftKey = true;
    } else if (lower === "alt") {
      altKey = true;
    } else if (lower === "super" || lower === "meta" || lower === "cmd" || lower === "win") {
      metaKey = true;
    } else {
      key = lower;
    }
  }

  return { ctrlKey, shiftKey, altKey, metaKey, key };
}

/**
 * Match a browser `KeyboardEvent` against a parsed or raw accelerator string.
 */
export function matchesAccelerator(event: KeyboardEvent, accelerator: string): boolean {
  if (!accelerator) return false;
  const parsed = parseAccelerator(accelerator);

  const eventKey = event.key.toLowerCase();
  let targetKey = parsed.key;

  // Handle special key mappings
  if (targetKey === "comma" || targetKey === ",") targetKey = ",";
  if (targetKey === "period" || targetKey === ".") targetKey = ".";

  const keyMatches = eventKey === targetKey || event.code.toLowerCase() === `key${targetKey}`;
  const modifiersMatch =
    event.ctrlKey === parsed.ctrlKey &&
    event.shiftKey === parsed.shiftKey &&
    event.altKey === parsed.altKey &&
    event.metaKey === parsed.metaKey;

  return keyMatches && modifiersMatch;
}

/**
 * React hook that listens for global keyboard shortcuts configured in `bindings.yaml`
 * (`useConfigStore(s => s.bindings)`).
 */
export function useKeyBindings() {
  const bindings = useConfigStore((state) => state.bindings.bindings);

  const handleAction = useCallback(async (action: string) => {
    switch (action) {
      case "open_settings": {
        if (isTauri()) {
          try {
            await openConfigDir();
          } catch (err) {
            console.error("Failed to open config directory:", err);
          }
        }
        break;
      }

      case "reload": {
        if (isTauri()) {
          try {
            const { getCurrentWindow } = await import("@tauri-apps/api/window");
            const win = getCurrentWindow();
            await (win as unknown as { webview?: { reload?: () => Promise<void> } }).webview?.reload?.();
          } catch {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
        break;
      }

      case "quit": {
        if (isTauri()) {
          try {
            const { getCurrentWindow } = await import("@tauri-apps/api/window");
            await getCurrentWindow().close();
          } catch (err) {
            console.error("Failed to close window on quit action:", err);
          }
        }
        break;
      }

      case "toggle_fullscreen": {
        if (isTauri()) {
          try {
            const { getCurrentWindow } = await import("@tauri-apps/api/window");
            const win = getCurrentWindow();
            const isFull = await win.isFullscreen();
            await win.setFullscreen(!isFull);
          } catch {
            if (!document.fullscreenElement) {
              await document.documentElement.requestFullscreen();
            } else {
              await document.exitFullscreen();
            }
          }
        } else {
          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
          } else {
            await document.exitFullscreen();
          }
        }
        break;
      }

      case "toggle_window": {
        if (isTauri()) {
          try {
            const { getCurrentWindow } = await import("@tauri-apps/api/window");
            const win = getCurrentWindow();
            const isMinimized = await win.isMinimized();
            const isVisible = await win.isVisible();
            if (!isVisible || isMinimized) {
              // Show / unminimize — bring the window to the foreground
              await win.show();
              await win.unminimize();
              await win.setFocus();
            } else {
              // Hide to tray / minimize
              const settings = useConfigStore.getState().settings;
              if (settings?.window?.minimize_to_tray) {
                await win.hide();
              } else {
                await win.minimize();
              }
            }
          } catch (err) {
            console.error("Failed to toggle window visibility:", err);
          }
        }
        break;
      }

      case "toggle_maximize": {
        if (isTauri()) {
          try {
            const { getCurrentWindow } = await import("@tauri-apps/api/window");
            const win = getCurrentWindow();
            const isMaximized = await win.isMaximized();
            if (isMaximized) {
              await win.unmaximize();
            } else {
              await win.maximize();
            }
          } catch (err) {
            console.error("Failed to toggle maximize:", err);
          }
        }
        break;
      }

      case "zoom_in": {
        const root = document.documentElement;
        const currentZoom = parseFloat(root.style.getPropertyValue("--app-zoom") || "1");
        const newZoom = Math.min(2.0, currentZoom + 0.1);
        root.style.setProperty("--app-zoom", newZoom.toString());
        root.style.zoom = newZoom.toString();
        break;
      }

      case "zoom_out": {
        const root = document.documentElement;
        const currentZoom = parseFloat(root.style.getPropertyValue("--app-zoom") || "1");
        const newZoom = Math.max(0.5, currentZoom - 0.1);
        root.style.setProperty("--app-zoom", newZoom.toString());
        root.style.zoom = newZoom.toString();
        break;
      }

      case "reset_zoom": {
        const root = document.documentElement;
        root.style.setProperty("--app-zoom", "1");
        root.style.zoom = "1";
        break;
      }

      case "help": {
        const website = useConfigStore.getState().appInfo.website;
        if (website && typeof window !== "undefined") {
          window.open(website, "_blank");
        }
        break;
      }

      case "toggle_sidebar": {
        window.dispatchEvent(new CustomEvent("geosource:toggle-sidebar"));
        break;
      }

      default:
        break;
    }
  }, []);

  useEffect(() => {
    if (!bindings || Object.keys(bindings).length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key shortcuts if focus is inside text inputs or textareas
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }

      for (const [action, accelerator] of Object.entries(bindings)) {
        if (matchesAccelerator(e, accelerator)) {
          e.preventDefault();
          void handleAction(action);
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bindings, handleAction]);
}
