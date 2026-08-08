"use client";

import { useEffect, useState, type FC } from "react";
import {
  Monitor,
  EyeOff,
  Settings,
  RefreshCw,
  Power,
  Layers,
} from "lucide-react";
import styles from "@/components/ui/TrayMenu/TrayMenu.module.css";

/**
 * Custom Tray Context Menu Page.
 * Rendered inside the transparent frameless 'tray-menu' webview window.
 * Matches Nord Polar Night dark theme aesthetic.
 */
const TrayMenuPage: FC = () => {
  const [isMainVisible, setIsMainVisible] = useState(true);

  // Synchronize main window visibility state on mount
  useEffect(() => {
    let active = true;

    const checkVisibility = async () => {
      try {
        const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
        const mainWin = await WebviewWindow.getByLabel("main");
        if (mainWin && active) {
          const visible = await mainWin.isVisible();
          const min = await mainWin.isMinimized();
          setIsMainVisible(visible && !min);
        }
      } catch (err) {
        console.error("Failed to check main window state", err);
      }
    };

    void checkVisibility();
    const interval = setInterval(checkVisibility, 400);
    window.addEventListener("focus", checkVisibility);
    return () => {
      active = false;
      clearInterval(interval);
      window.removeEventListener("focus", checkVisibility);
    };
  }, []);

  const hideTrayMenu = async () => {
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      await getCurrentWindow().hide();
    } catch (err) {
      console.error("Failed to hide tray menu", err);
    }
  };

  // Handle keyboard navigation (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        void hideTrayMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleMain = async () => {
    try {
      const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
      const mainWin = await WebviewWindow.getByLabel("main");
      if (mainWin) {
        const visible = await mainWin.isVisible();
        const min = await mainWin.isMinimized();
        if (visible && !min) {
          await mainWin.hide();
        } else {
          await mainWin.unminimize();
          await mainWin.show();
          await mainWin.setFocus();
        }
      }
    } catch (err) {
      console.error("Failed to toggle main window", err);
    } finally {
      await hideTrayMenu();
    }
  };

  const handleOpenSettings = async () => {
    try {
      const { openConfigDir } = await import("@/lib/config");
      await openConfigDir();
    } catch (err) {
      console.error("Failed to open config directory", err);
    } finally {
      await hideTrayMenu();
    }
  };

  const handleQuit = async () => {
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      // Close tray menu and main window to exit app cleanly
      const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");
      const mainWin = await WebviewWindow.getByLabel("main");
      if (mainWin) {
        await mainWin.close();
      }
      await getCurrentWindow().close();
    } catch (err) {
      console.error("Failed to quit app", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuCard}>
        {/* Context Menu Header */}
        <div className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.statusDot} />
            <Layers size={13} className={styles.brandIcon} />
            <span>GeoSource</span>
          </div>
          <span className={styles.versionBadge}>v0.1.0</span>
        </div>

        {/* Menu Actions */}
        <div className={styles.menuList}>
          <button
            type="button"
            className={styles.menuItem}
            onClick={handleToggleMain}
          >
            <div className={styles.menuItemContent}>
              {isMainVisible ? (
                <EyeOff className={styles.icon} />
              ) : (
                <Monitor className={styles.icon} />
              )}
              <span>{isMainVisible ? "Hide" : "Show"}</span>
            </div>
            <span className={styles.shortcut}>Ctrl+H</span>
          </button>

          <button
            type="button"
            className={styles.menuItem}
            onClick={handleOpenSettings}
          >
            <div className={styles.menuItemContent}>
              <Settings className={styles.icon} />
              <span>Preferences</span>
            </div>
            <span className={styles.shortcut}>Ctrl+,</span>
          </button>

          <button
            type="button"
            className={styles.menuItem}
            onClick={hideTrayMenu}
          >
            <div className={styles.menuItemContent}>
              <RefreshCw className={styles.icon} />
              <span>Check Updates</span>
            </div>
          </button>

          <div className={styles.divider} />

          <button
            type="button"
            className={`${styles.menuItem} ${styles.menuItemDanger}`}
            onClick={handleQuit}
          >
            <div className={styles.menuItemContent}>
              <Power className={styles.icon} />
              <span>Quit GeoSource</span>
            </div>
            <span className={styles.shortcut}>Alt+F4</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrayMenuPage;
