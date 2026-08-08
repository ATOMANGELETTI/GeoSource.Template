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
  return (
    typeof window !== "undefined" &&
    ("__TAURI_INTERNALS__" in window || "__TAURI__" in window)
  );
}
