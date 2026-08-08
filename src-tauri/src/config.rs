use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;

// ---------------------------------------------------------------------------
// Structs
// ---------------------------------------------------------------------------

/// Application appearance and behaviour settings (`settings.yaml`).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WindowSettings {
    /// Restore the last window size on next launch.
    pub remember_size: bool,
    /// Launch the window maximized.
    pub start_maximized: bool,
}

impl Default for WindowSettings {
    fn default() -> Self {
        Self {
            remember_size: true,
            start_maximized: false,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppSettings {
    /// UI color theme. One of: `dark`, `light`, `system`.
    pub theme: String,
    /// ISO 639-1 language code (e.g. `en`, `fr`).
    pub language: String,
    /// Window behaviour.
    pub window: WindowSettings,
    /// Minimum log level written to file. One of: `trace`, `debug`, `info`, `warn`, `error`.
    pub log_level: String,
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            theme: "dark".into(),
            language: "en".into(),
            window: WindowSettings::default(),
            log_level: "info".into(),
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
        Self { bindings: map }
    }
}

/// Read-only application metadata (`appinfo.yaml`).
/// The app reads this once at startup and **never writes back to this file**.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppInfo {
    /// Semantic version string (e.g. `"0.1.0"`).
    pub version: String,
    /// Human-readable release code name.
    pub codename: String,
    /// Build identifier or channel (e.g. `"dev"`, `"stable"`).
    pub build: String,
    /// Short description of the application.
    pub description: String,
}

impl Default for AppInfo {
    fn default() -> Self {
        Self {
            version: "0.1.0".into(),
            codename: "Meridian".into(),
            build: "dev".into(),
            description: "GeoSource Tauri Template Desktop Application".into(),
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
fn resolve_config_dir() -> PathBuf {
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
fn load_yaml<T: for<'de> Deserialize<'de> + Default>(path: &PathBuf, label: &str) -> T {
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
fn save_yaml<T: Serialize>(value: &T, path: &PathBuf, label: &str) -> anyhow::Result<()> {
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

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_settings_default_values() {
        let s = AppSettings::default();
        assert_eq!(s.theme, "dark");
        assert_eq!(s.language, "en");
        assert!(s.window.remember_size);
        assert!(!s.window.start_maximized);
        assert_eq!(s.log_level, "info");
    }

    #[test]
    fn test_bindings_default_contains_known_actions() {
        let b = AppBindings::default();
        assert!(b.bindings.contains_key("toggle_sidebar"));
        assert!(b.bindings.contains_key("open_settings"));
        assert!(b.bindings.contains_key("quit"));
        assert!(b.bindings.contains_key("reload"));
    }

    #[test]
    fn test_appinfo_default_values() {
        let i = AppInfo::default();
        assert_eq!(i.version, "0.1.0");
        assert!(!i.codename.is_empty());
        assert!(!i.build.is_empty());
    }

    #[test]
    fn test_settings_yaml_round_trip() {
        let original = AppSettings::default();
        let yaml = serde_yaml::to_string(&original).expect("serialize");
        let deserialized: AppSettings = serde_yaml::from_str(&yaml).expect("deserialize");
        assert_eq!(original.theme, deserialized.theme);
        assert_eq!(original.language, deserialized.language);
        assert_eq!(original.log_level, deserialized.log_level);
    }

    #[test]
    fn test_bindings_yaml_round_trip() {
        let original = AppBindings::default();
        let yaml = serde_yaml::to_string(&original).expect("serialize");
        let deserialized: AppBindings = serde_yaml::from_str(&yaml).expect("deserialize");
        assert_eq!(
            original.bindings.get("toggle_sidebar"),
            deserialized.bindings.get("toggle_sidebar")
        );
    }

    #[test]
    fn test_appinfo_yaml_round_trip() {
        let original = AppInfo::default();
        let yaml = serde_yaml::to_string(&original).expect("serialize");
        let deserialized: AppInfo = serde_yaml::from_str(&yaml).expect("deserialize");
        assert_eq!(original.version, deserialized.version);
        assert_eq!(original.codename, deserialized.codename);
    }

    #[test]
    fn test_load_yaml_falls_back_to_default_on_missing_file() {
        let path = PathBuf::from("/nonexistent/path/that/does/not/exist.yaml");
        let result: AppSettings = load_yaml(&path, "test");
        // Should return default without panicking
        assert_eq!(result.theme, "dark");
    }

    #[test]
    fn test_load_yaml_falls_back_to_default_on_malformed_yaml() {
        let dir = std::env::temp_dir();
        let path = dir.join("geosource_test_malformed.yaml");
        fs::write(&path, b"{{ not valid yaml {{{{").unwrap();
        let result: AppSettings = load_yaml(&path, "test");
        assert_eq!(result.theme, "dark");
        let _ = fs::remove_file(&path);
    }

    #[test]
    fn test_save_and_load_roundtrip_via_tempfile() {
        let dir = std::env::temp_dir();
        let path = dir.join("geosource_test_settings_rt.yaml");

        let mut original = AppSettings::default();
        original.theme = "light".into();
        original.language = "fr".into();

        save_yaml(&original, &path, "test").expect("save");

        let loaded: AppSettings = load_yaml(&path, "test");
        assert_eq!(loaded.theme, "light");
        assert_eq!(loaded.language, "fr");

        let _ = fs::remove_file(&path);
    }

    #[test]
    fn test_save_and_load_bindings_via_tempfile() {
        let dir = std::env::temp_dir();
        let path = dir.join("geosource_test_bindings_rt.yaml");

        let mut original = AppBindings::default();
        original.bindings.insert("custom_action".into(), "Ctrl+Alt+X".into());

        save_yaml(&original, &path, "test").expect("save");

        let loaded: AppBindings = load_yaml(&path, "test");
        assert_eq!(
            loaded.bindings.get("custom_action").map(String::as_str),
            Some("Ctrl+Alt+X")
        );

        let _ = fs::remove_file(&path);
    }
}
