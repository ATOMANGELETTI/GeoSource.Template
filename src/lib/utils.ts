/**
 * Utility functions for the GeoSource Template application.
 */

/**
 * Combines class names, filtering out falsy values.
 * Lightweight alternative to clsx for simple use cases.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a version string with a "v" prefix.
 */
export function formatVersion(version: string): string {
  return version.startsWith("v") ? version : `v${version}`;
}

/**
 * Returns true if running inside a Tauri webview.
 */
export function isTauri(): boolean {
  if (typeof window === "undefined") return false;
  const win = window as unknown as Record<string, unknown>;
  return Boolean(win.__TAURI_INTERNALS__ || win.__TAURI__);
}
