use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;

// ---------------------------------------------------------------------------
// Structs
// ---------------------------------------------------------------------------

fn default_true() -> bool { true }
fn default_font_size() -> u32 { 13 }
fn default_crs() -> String { "EPSG:4326".into() }
fn default_max_spatial_memory() -> u32 { 1024 }
fn default_theme() -> String { "polar-night".into() }
fn default_language() -> String { "en".into() }
fn default_app_name() -> String { "GeoSource".into() }
fn default_version() -> String { "0.1.0".into() }
fn default_codename() -> String { "Melody".into() }
fn default_build() -> String { "dev".into() }
fn default_description() -> String { "GeoSource Tauri Template Desktop Application".into() }
fn default_author() -> String { "GeoSource Team".into() }
fn default_website() -> String { "https://github.com/ATOMANGELETTI/GeoSource.Template".into() }
fn default_license() -> String { "MIT".into() }
fn default_copyright() -> String { "Copyright © 2026 GeoSource. All rights reserved.".into() }

/// Window appearance and positioning settings.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WindowSettings {
    #[serde(default = "default_true")]
    pub remember_size: bool,
    #[serde(default)]
    pub start_maximized: bool,
    #[serde(default)]
    pub always_on_top: bool,
    #[serde(default)]
    pub close_to_tray: bool,
    #[serde(default)]
    pub minimize_to_tray: bool,
}

impl Default for WindowSettings {
    fn default() -> Self {
        Self {
            remember_size: true,
            start_maximized: false,
            always_on_top: false,
            close_to_tray: false,
            minimize_to_tray: false,
        }
    }
}

/// User interface customisation settings.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UiSettings {
    #[serde(default = "default_true")]
    pub animations_enabled: bool,
    #[serde(default = "default_true")]
    pub show_status_bar: bool,
    #[serde(default = "default_font_size")]
    pub font_size: u32,
}

impl Default for UiSettings {
    fn default() -> Self {
        Self {
            animations_enabled: true,
            show_status_bar: true,
            font_size: 13,
        }
    }
}

/// System & runtime settings.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemSettings {
    #[serde(default = "default_true")]
    pub auto_check_updates: bool,
    #[serde(default = "default_true")]
    pub hardware_acceleration: bool,
}

impl Default for SystemSettings {
    fn default() -> Self {
        Self {
            auto_check_updates: true,
            hardware_acceleration: true,
        }
    }
}

/// GIS & Spatial engine settings.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GisSettings {
    #[serde(default = "default_crs")]
    pub default_crs: String,
    #[serde(default = "default_true")]
    pub tile_cache_enabled: bool,
    #[serde(default = "default_max_spatial_memory")]
    pub max_spatial_memory_mb: u32,
}

impl Default for GisSettings {
    fn default() -> Self {
        Self {
            default_crs: "EPSG:4326".into(),
            tile_cache_enabled: true,
            max_spatial_memory_mb: 1024,
        }
    }
}

/// Granular log level toggle settings.
#[derive(Debug, Clone, Serialize, PartialEq, Eq)]
pub struct LogLevelSettings {
    #[serde(default)]
    pub trace: bool,
    #[serde(default)]
    pub debug: bool,
    #[serde(default = "default_true")]
    pub info: bool,
    #[serde(default = "default_true")]
    pub warn: bool,
    #[serde(default = "default_true")]
    pub error: bool,
}

impl Default for LogLevelSettings {
    fn default() -> Self {
        Self {
            trace: false,
            debug: false,
            info: true,
            warn: true,
            error: true,
        }
    }
}

impl LogLevelSettings {
    /// Check if a log message at `level` should be output.
    pub fn should_log(&self, level: log::Level) -> bool {
        match level {
            log::Level::Error => self.error,
            log::Level::Warn => self.warn,
            log::Level::Info => self.info,
            log::Level::Debug => self.debug,
            log::Level::Trace => self.trace,
        }
    }
}

impl<'de> Deserialize<'de> for LogLevelSettings {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        #[derive(Deserialize)]
        #[serde(untagged)]
        enum Helper {
            String(String),
            Map {
                #[serde(default)]
                trace: bool,
                #[serde(default)]
                debug: bool,
                #[serde(default = "default_true")]
                info: bool,
                #[serde(default = "default_true")]
                warn: bool,
                #[serde(default = "default_true")]
                error: bool,
            },
        }

        match Helper::deserialize(deserializer)? {
            Helper::String(s) => match s.to_lowercase().trim() {
                "trace" => Ok(Self {
                    trace: true,
                    debug: true,
                    info: true,
                    warn: true,
                    error: true,
                }),
                "debug" => Ok(Self {
                    trace: false,
                    debug: true,
                    info: true,
                    warn: true,
                    error: true,
                }),
                "warn" | "warning" => Ok(Self {
                    trace: false,
                    debug: false,
                    info: false,
                    warn: true,
                    error: true,
                }),
                "error" => Ok(Self {
                    trace: false,
                    debug: false,
                    info: false,
                    warn: false,
                    error: true,
                }),
                _ => Ok(Self::default()),
            },
            Helper::Map {
                trace,
                debug,
                info,
                warn,
                error,
            } => Ok(Self {
                trace,
                debug,
                info,
                warn,
                error,
            }),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppSettings {
    #[serde(default = "default_theme")]
    pub theme: String,
    #[serde(default = "default_language")]
    pub language: String,
    #[serde(default)]
    pub log_level: LogLevelSettings,
    #[serde(default)]
    pub window: WindowSettings,
    #[serde(default)]
    pub ui: UiSettings,
    #[serde(default)]
    pub system: SystemSettings,
    #[serde(default)]
    pub gis: GisSettings,
}

impl AppSettings {
    /// Check if a given log level is enabled.
    #[allow(dead_code)]
    pub fn should_log(&self, level: log::Level) -> bool {
        self.log_level.should_log(level)
    }
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            theme: "polar-night".into(),
            language: "en".into(),
            log_level: LogLevelSettings::default(),
            window: WindowSettings::default(),
            ui: UiSettings::default(),
            system: SystemSettings::default(),
            gis: GisSettings::default(),
        }
    }
}

/// Keyboard shortcut bindings (`bindings.yaml`).
/// Keys are action identifiers; values are accelerator strings (e.g. `"Ctrl+B"`).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppBindings {
    pub bindings: HashMap<String, String>,
}

impl Default for AppBindings {
    fn default() -> Self {
        let mut map = HashMap::new();
        map.insert("toggle_sidebar".into(), "Ctrl+B".into());
        map.insert("open_settings".into(), "Ctrl+,".into());
        map.insert("quit".into(), "Alt+F4".into());
        map.insert("reload".into(), "Ctrl+R".into());
        map.insert("toggle_fullscreen".into(), "F11".into());
        map.insert("toggle_devtools".into(), "F12".into());
        map.insert("minimize".into(), "Ctrl+M".into());
        map.insert("zoom_in".into(), "Ctrl+=".into());
        map.insert("zoom_out".into(), "Ctrl+-".into());
        map.insert("reset_zoom".into(), "Ctrl+0".into());
        map.insert("copy".into(), "Ctrl+C".into());
        map.insert("paste".into(), "Ctrl+V".into());
        map.insert("help".into(), "F1".into());
        Self { bindings: map }
    }
}

/// Read-only application metadata (`appinfo.yaml`).
/// The app reads this once at startup and **never writes back to this file**.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppInfo {
    #[serde(default = "default_app_name")]
    pub name: String,
    #[serde(default = "default_version")]
    pub version: String,
    #[serde(default = "default_codename")]
    pub codename: String,
    #[serde(default = "default_build")]
    pub build: String,
    #[serde(default = "default_description")]
    pub description: String,
    #[serde(default = "default_author")]
    pub author: String,
    #[serde(default = "default_website")]
    pub website: String,
    #[serde(default = "default_license")]
    pub license: String,
    #[serde(default = "default_copyright")]
    pub copyright: String,
}

impl Default for AppInfo {
    fn default() -> Self {
        Self {
            name: "GeoSource".into(),
            version: "0.1.0".into(),
            codename: "Melody".into(),
            build: "dev".into(),
            description: "GeoSource Tauri Template Desktop Application".into(),
            author: "GeoSource Team".into(),
            website: "https://github.com/ATOMANGELETTI/GeoSource.Template".into(),
            license: "MIT".into(),
            copyright: "Copyright © 2026 GeoSource. All rights reserved.".into(),
        }
    }
}

/// Aggregate config state managed as Tauri `State<Mutex<AppConfig>>`.
#[derive(Debug, Clone)]
pub struct AppConfig {
    pub settings: AppSettings,
    pub bindings: AppBindings,
    /// Read-only — loaded once at startup; never persisted by the app.
    pub info: AppInfo,
    /// Resolved path to `other/configs/` for subsequent save operations.
    pub config_dir: PathBuf,
}

// ---------------------------------------------------------------------------
// Directory resolution
// ---------------------------------------------------------------------------

/// Resolve the `other/configs/` directory relative to the project root.
/// Mirrors the same step-up logic used in `logger.rs`.
pub fn resolve_config_dir() -> PathBuf {
    let mut root = std::env::current_dir().unwrap_or_else(|_| PathBuf::from("."));

    if root.ends_with("src-tauri") {
        if let Some(parent) = root.parent() {
            root = parent.to_path_buf();
        }
    }

    // Packaged binary: check exe directory if `other/` is not at cwd.
    if !root.join("other").exists() {
        if let Ok(exe) = std::env::current_exe() {
            if let Some(exe_dir) = exe.parent() {
                if exe_dir.join("other").exists() {
                    root = exe_dir.to_path_buf();
                }
            }
        }
    }

    root.join("other").join("configs")
}

// ---------------------------------------------------------------------------
// Load helpers
// ---------------------------------------------------------------------------

/// Read a YAML file and deserialize it into `T`, falling back to `T::default()`
/// when the file is missing or malformed.
pub fn load_yaml<T: for<'de> Deserialize<'de> + Default>(path: &PathBuf, label: &str) -> T {
    match fs::read_to_string(path) {
        Ok(contents) => match serde_yaml::from_str(&contents) {
            Ok(value) => value,
            Err(err) => {
                log::warn!(
                    target: "geosource::config",
                    "Failed to parse {label} ({path:?}): {err}. Using defaults."
                );
                T::default()
            }
        },
        Err(_) => {
            log::info!(
                target: "geosource::config",
                "{label} not found at {path:?}. Defaults will be written."
            );
            T::default()
        }
    }
}

/// Serialize `value` to YAML and write it to `path`, creating parent directories
/// as needed.
pub fn save_yaml<T: Serialize>(value: &T, path: &PathBuf, label: &str) -> anyhow::Result<()> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    let yaml = serde_yaml::to_string(value)
        .map_err(|e| anyhow::anyhow!("Failed to serialize {label}: {e}"))?;
    fs::write(path, yaml.as_bytes())?;
    log::info!(target: "geosource::config", "Saved {label} → {path:?}");
    Ok(())
}

// ---------------------------------------------------------------------------
// Public API — called from lib.rs during setup
// ---------------------------------------------------------------------------

/// Load all three config files, write defaults for any that are missing or empty,
/// and return the `AppConfig` to be managed as Tauri state.
pub fn load_config() -> Mutex<AppConfig> {
    let config_dir = resolve_config_dir();
    log::info!(target: "geosource::config", "Config directory: {config_dir:?}");

    // Ensure the directory exists.
    if let Err(e) = fs::create_dir_all(&config_dir) {
        log::error!(target: "geosource::config", "Could not create config dir: {e}");
    }

    let settings_path = config_dir.join("settings.yaml");
    let bindings_path = config_dir.join("bindings.yaml");
    let info_path = config_dir.join("appinfo.yaml");

    let settings: AppSettings = load_yaml(&settings_path, "settings.yaml");
    let bindings: AppBindings = load_yaml(&bindings_path, "bindings.yaml");
    // appinfo is read-only — load but do NOT write back.
    let info: AppInfo = load_yaml(&info_path, "appinfo.yaml");

    // Write defaults for settings and bindings only if the file was missing or empty.
    if !settings_path.exists() || fs::metadata(&settings_path).map(|m| m.len()).unwrap_or(0) == 0 {
        if let Err(e) = save_yaml(&settings, &settings_path, "settings.yaml") {
            log::error!(target: "geosource::config", "Could not write default settings: {e}");
        }
    }

    if !bindings_path.exists() || fs::metadata(&bindings_path).map(|m| m.len()).unwrap_or(0) == 0 {
        if let Err(e) = save_yaml(&bindings, &bindings_path, "bindings.yaml") {
            log::error!(target: "geosource::config", "Could not write default bindings: {e}");
        }
    }

    log::info!(
        target: "geosource::config",
        "Config loaded — theme={}, language={}, version={}",
        settings.theme,
        settings.language,
        info.version
    );

    Mutex::new(AppConfig {
        settings,
        bindings,
        info,
        config_dir,
    })
}

// ---------------------------------------------------------------------------
// IPC Commands
// ---------------------------------------------------------------------------

/// Return the current application settings to the frontend.
#[tauri::command]
pub fn get_settings(state: tauri::State<Mutex<AppConfig>>) -> Result<AppSettings, String> {
    let cfg = state.lock().map_err(|e| e.to_string())?;
    Ok(cfg.settings.clone())
}

/// Return the current key bindings to the frontend.
#[tauri::command]
pub fn get_bindings(state: tauri::State<Mutex<AppConfig>>) -> Result<AppBindings, String> {
    let cfg = state.lock().map_err(|e| e.to_string())?;
    Ok(cfg.bindings.clone())
}

/// Return the read-only application info to the frontend.
#[tauri::command]
pub fn get_appinfo(state: tauri::State<Mutex<AppConfig>>) -> Result<AppInfo, String> {
    let cfg = state.lock().map_err(|e| e.to_string())?;
    Ok(cfg.info.clone())
}

/// Persist updated settings to disk and update in-memory state.
#[tauri::command]
pub fn set_settings(
    settings: AppSettings,
    state: tauri::State<Mutex<AppConfig>>,
) -> Result<(), String> {
    let mut cfg = state.lock().map_err(|e| e.to_string())?;
    let path = cfg.config_dir.join("settings.yaml");
    save_yaml(&settings, &path, "settings.yaml").map_err(|e| e.to_string())?;
    cfg.settings = settings;
    Ok(())
}

/// Persist updated bindings to disk and update in-memory state.
#[tauri::command]
pub fn set_bindings(
    bindings: AppBindings,
    state: tauri::State<Mutex<AppConfig>>,
) -> Result<(), String> {
    let mut cfg = state.lock().map_err(|e| e.to_string())?;
    let path = cfg.config_dir.join("bindings.yaml");
    save_yaml(&bindings, &path, "bindings.yaml").map_err(|e| e.to_string())?;
    cfg.bindings = bindings;
    Ok(())
}

/// Open the `other/configs/` directory in the system file explorer.
#[tauri::command]
pub fn open_config_dir(state: tauri::State<Mutex<AppConfig>>) -> Result<(), String> {
    let cfg = state.lock().map_err(|e| e.to_string())?;
    let dir = &cfg.config_dir;

    if !dir.exists() {
        if let Err(e) = fs::create_dir_all(dir) {
            log::error!(target: "geosource::config", "Failed to create config dir: {e}");
        }
    }

    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("explorer")
            .arg(dir)
            .spawn()
            .map_err(|e| format!("Failed to open explorer: {e}"))?;
    }

    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(dir)
            .spawn()
            .map_err(|e| format!("Failed to open directory: {e}"))?;
    }

    #[cfg(target_os = "linux")]
    {
        std::process::Command::new("xdg-open")
            .arg(dir)
            .spawn()
            .map_err(|e| format!("Failed to open directory: {e}"))?;
    }

    log::info!(target: "geosource::config", "Opened config dir in system file explorer: {dir:?}");
    Ok(())
}

// ---------------------------------------------------------------------------
// Tests

