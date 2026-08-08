"use client";

import { useCallback, useEffect } from "react";
import { useWindowStore } from "@/lib/store/windowStore";
import { isTauri } from "@/lib/utils";
import { logDebug, logError } from "@/lib/logger";
import type * as TauriWindowApi from "@tauri-apps/api/window";

// Tauri APIs — imported lazily to avoid breaking in non-Tauri environments
let tauriWindow: typeof TauriWindowApi | null = null;

async function getTauriWindow(): Promise<typeof TauriWindowApi | null> {
  if (!tauriWindow && isTauri()) {
    tauriWindow = await import("@tauri-apps/api/window");
  }
  return tauriWindow;
}

/**
 * Hook providing typed window control actions and reactive state.
 *
 * In non-Tauri environments (e.g. browser during development), actions are
 * no-ops so the UI still renders correctly.
 */
export function useTauriWindow() {
  const { isMaximized, isFocused, setMaximized, setFocused } = useWindowStore();

  // Sync maximized state on mount and subscribe to resize events
  useEffect(() => {
    let unlistenResize: (() => void) | undefined;
    let unlistenFocus: (() => void) | undefined;
    let cancelled = false;

    const init = async () => {
      try {
        const api = await getTauriWindow();
        if (!api || cancelled) return;

        const win = api.getCurrentWindow();

        // Initial state
        const maximized = await win.isMaximized();
        if (!cancelled) setMaximized(maximized);

        // Listen for resize events to track maximize/restore
        const uResize = await win.onResized(async () => {
          if (cancelled) return;
          const nowMaximized = await win.isMaximized();
          setMaximized(nowMaximized);
        });

        const uFocus = await win.onFocusChanged(({ payload: focused }) => {
          if (cancelled) return;
          setFocused(focused);
        });

        if (cancelled) {
          uResize();
          uFocus();
        } else {
          unlistenResize = uResize;
          unlistenFocus = uFocus;
        }
      } catch (err) {
        void logError("Failed to initialize Tauri window listeners", String(err));
      }
    };

    void init();

    return () => {
      cancelled = true;
      unlistenResize?.();
      unlistenFocus?.();
    };
  }, [setMaximized, setFocused]);

  const minimize = useCallback(async () => {
    void logDebug("[UI] Minimize window button clicked");
    const api = await getTauriWindow();
    if (!api) return;
    await api.getCurrentWindow().minimize();
  }, []);

  const maximize = useCallback(async () => {
    void logDebug("[UI] Maximize/Restore window button clicked");
    const api = await getTauriWindow();
    if (!api) return;
    await api.getCurrentWindow().toggleMaximize();
  }, []);

  const close = useCallback(async () => {
    void logDebug("[UI] Close window button clicked");
    const api = await getTauriWindow();
    if (!api) return;
    await api.getCurrentWindow().close();
  }, []);

  return {
    isMaximized,
    isFocused,
    minimize,
    maximize,
    close,
  };
}
