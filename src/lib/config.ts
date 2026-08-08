import { isTauri } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types — mirror the Rust structs in config.rs
// ---------------------------------------------------------------------------

export interface WindowSettings {
  /** Restore window dimensions from the last session. */
  remember_size: boolean;
  /** Override remember_size and launch maximized. */
  start_maximized: boolean;
}

export type ThemeName =
  | "polar-night"
  | "snow-storm"
  | "frost"
  | "aurora"
  | "dark"
  | "light"
  | "system"
  | (string & {});

export interface AppSettings {
  /** UI color theme: `"polar-night"` | `"snow-storm"` | `"frost"` | `"aurora"` | `"system"` */
  theme: ThemeName;
  /** ISO 639-1 language code (e.g. `"en"`, `"fr"`). */
  language: string;
  window: WindowSettings;
  /** Minimum log level: `"trace"` | `"debug"` | `"info"` | `"warn"` | `"error"` */
  log_level: "trace" | "debug" | "info" | "warn" | "error";
}

export interface AppBindings {
  /** Map of action identifiers → accelerator strings (e.g. `"Ctrl+B"`). */
  bindings: Record<string, string>;
}

export interface AppInfo {
  /** Semantic version string (e.g. `"0.1.0"`). */
  version: string;
  /** Human-readable release code name. */
  codename: string;
  /** Build channel: `"dev"` | `"alpha"` | `"beta"` | `"rc"` | `"stable"` */
  build: string;
  /** Short description of the application. */
  description: string;
}

// ---------------------------------------------------------------------------
// Default values — used in non-Tauri (browser / test) environments
// ---------------------------------------------------------------------------

export const DEFAULT_SETTINGS: AppSettings = {
  theme: "polar-night",
  language: "en",
  window: { remember_size: true, start_maximized: false },
  log_level: "info",
};

export const DEFAULT_BINDINGS: AppBindings = {
  bindings: {
    toggle_sidebar: "Ctrl+B",
    open_settings: "Ctrl+,",
    quit: "Alt+F4",
    reload: "Ctrl+R",
  },
};

export const DEFAULT_APPINFO: AppInfo = {
  version: "0.1.0",
  codename: "Meridian",
  build: "dev",
  description: "GeoSource Tauri Template Desktop Application",
};

// ---------------------------------------------------------------------------
// IPC helpers
// ---------------------------------------------------------------------------

async function invokeConfig<T>(command: string, args?: Record<string, unknown>): Promise<T> {
  const { invoke } = await import("@tauri-apps/api/core");
  return invoke<T>(command, args);
}

// ---------------------------------------------------------------------------
// Read commands
// ---------------------------------------------------------------------------

/** Fetch the current application settings from the Rust backend. */
export async function getSettings(): Promise<AppSettings> {
  if (!isTauri()) return DEFAULT_SETTINGS;
  return invokeConfig<AppSettings>("get_settings");
}

/** Fetch the current key bindings from the Rust backend. */
export async function getBindings(): Promise<AppBindings> {
  if (!isTauri()) return DEFAULT_BINDINGS;
  return invokeConfig<AppBindings>("get_bindings");
}

/**
 * Fetch the read-only application info from the Rust backend.
 * The backend loads this from `appinfo.yaml` and never writes it back.
 */
export async function getAppInfo(): Promise<AppInfo> {
  if (!isTauri()) return DEFAULT_APPINFO;
  return invokeConfig<AppInfo>("get_appinfo");
}

// ---------------------------------------------------------------------------
// Write commands
// ---------------------------------------------------------------------------

/**
 * Persist updated settings to disk via the Rust backend.
 * The backend writes the full `settings.yaml` and updates in-memory state.
 */
export async function setSettings(settings: AppSettings): Promise<void> {
  if (!isTauri()) return;
  await invokeConfig<void>("set_settings", { settings });
}

/**
 * Persist updated bindings to disk via the Rust backend.
 * The backend writes the full `bindings.yaml` and updates in-memory state.
 */
export async function setBindings(bindings: AppBindings): Promise<void> {
  if (!isTauri()) return;
  await invokeConfig<void>("set_bindings", { bindings });
}
