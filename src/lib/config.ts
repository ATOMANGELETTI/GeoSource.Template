import { isTauri } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types — mirror the Rust structs in config.rs
// ---------------------------------------------------------------------------

export interface WindowSettings {
  /** Restore window dimensions from the last session. */
  remember_size: boolean;
  /** Override remember_size and launch maximized. */
  start_maximized: boolean;
  /** Keep window above all other windows. */
  always_on_top: boolean;
  /** Close button hides to tray instead of quitting. */
  close_to_tray: boolean;
  /** Minimize button hides window to tray. */
  minimize_to_tray: boolean;
}

export type FontName = "terminus" | "fira-code" | "ubuntu";

export interface UiSettings {
  /** Enable micro-animations & transitions. */
  animations_enabled: boolean;
  /** Display bottom status bar in UI. */
  show_status_bar: boolean;
  /** Base font size in px. */
  font_size: number;
  /** Active font family: `"terminus"` | `"fira-code"` | `"ubuntu"` */
  font: FontName;
}

export interface SystemSettings {
  /** Enable WebGL and GPU hardware acceleration. */
  hardware_acceleration: boolean;
  /** Launch application automatically when Windows boots. */
  start_with_windows: boolean;
}

export interface GisSettings {
  /** Default coordinate reference system. */
  default_crs: string;
  /** Enable spatial tile caching on disk. */
  tile_cache_enabled: boolean;
  /** Maximum memory allocated for spatial rendering (MB). */
  max_spatial_memory_mb: number;
}

export interface LogLevelSettings {
  /** Include trace level diagnostics. */
  trace: boolean;
  /** Include debug level logs. */
  debug: boolean;
  /** Include general info logs. */
  info: boolean;
  /** Include warning messages. */
  warn: boolean;
  /** Include error & critical events. */
  error: boolean;
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
  ui: UiSettings;
  system: SystemSettings;
  gis: GisSettings;
  /** Granular log level toggles. */
  log_level: LogLevelSettings;
}

export interface AppBindings {
  /** Map of action identifiers → accelerator strings (e.g. `"Ctrl+B"`). */
  bindings: Record<string, string>;
}

export interface AppInfo {
  /** Application display name. */
  name: string;
  /** Semantic version string (e.g. `"0.1.0"`). */
  version: string;
  /** Human-readable release code name. */
  codename: string;
  /** Build channel: `"dev"` | `"alpha"` | `"beta"` | `"rc"` | `"stable"` */
  build: string;
  /** Short description of the application. */
  description: string;
  /** Development team or author name. */
  author: string;
  /** Project website or repo URL. */
  website: string;
  /** Open-source license string. */
  license: string;
  /** Copyright statement. */
  copyright: string;
}

// ---------------------------------------------------------------------------
// Default values — used in non-Tauri (browser / test) environments
// ---------------------------------------------------------------------------

export const DEFAULT_SETTINGS: AppSettings = {
  theme: "polar-night",
  language: "en",
  window: {
    remember_size: true,
    start_maximized: false,
    always_on_top: false,
    close_to_tray: false,
    minimize_to_tray: false,
  },
  ui: {
    animations_enabled: true,
    show_status_bar: true,
    font_size: 13,
    font: "terminus",
  },
  system: {
    hardware_acceleration: true,
    start_with_windows: false,
  },
  gis: {
    default_crs: "EPSG:4326",
    tile_cache_enabled: true,
    max_spatial_memory_mb: 1024,
  },
  log_level: {
    trace: false,
    debug: false,
    info: true,
    warn: true,
    error: true,
  },
};

export const DEFAULT_BINDINGS: AppBindings = {
  bindings: {
    toggle_sidebar: "Ctrl+B",
    open_settings: "Ctrl+,",
    quit: "Alt+F4",
    reload: "Ctrl+R",
    toggle_fullscreen: "F11",
    toggle_devtools: "F12",
    toggle_window: "Ctrl+M",
    toggle_maximize: "Ctrl+L",
    zoom_in: "Ctrl+=",
    zoom_out: "Ctrl+-",
    reset_zoom: "Ctrl+0",
    copy: "Ctrl+C",
    paste: "Ctrl+V",
    help: "F1",
  },
};

export const DEFAULT_APPINFO: AppInfo = {
  name: "GeoSource",
  version: "0.1.0",
  codename: "Melody",
  build: "dev",
  description: "GeoSource Tauri Template Desktop Application",
  author: "GeoSource Team",
  website: "https://github.com/ATOMANGELETTI/GeoSource.Template",
  license: "GPL-3.0-or-later",
  copyright: "Copyright © 2026 GeoSource. All rights reserved.",
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

/**
 * Open the `other/configs/` directory in the system file explorer.
 */
export async function openConfigDir(): Promise<void> {
  if (!isTauri()) return;
  await invokeConfig<void>("open_config_dir");
}

/**
 * Open the `other/utilities/` directory in the system file explorer.
 */
export async function openUtilitiesDir(): Promise<void> {
  if (!isTauri()) return;
  await invokeConfig<void>("open_utilities_dir");
}

/**
 * Open the `other/logs/` directory in the system file explorer.
 */
export async function openLogsDir(): Promise<void> {
  if (!isTauri()) return;
  await invokeConfig<void>("open_logs_dir");
}

/**
 * Signal the backend to display the main window and close the splashscreen window.
 */
export async function closeSplashAndShowMain(): Promise<void> {
  if (!isTauri()) return;
  await invokeConfig<void>("close_splash_and_show_main");
}

/**
 * Enable or disable launching the app automatically when Windows boots.
 * Persists the change to disk via the Rust backend.
 */
export async function syncAutostart(enabled: boolean): Promise<void> {
  if (!isTauri()) return;
  await invokeConfig<void>("sync_autostart", { enabled });
}

