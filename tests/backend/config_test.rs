use crate::config::*;
use std::fs;
use std::path::PathBuf;

#[test]
fn test_settings_default_values() {
    let s = AppSettings::default();
    assert_eq!(s.theme, "polar-night");
    assert_eq!(s.language, "en");
    assert!(s.window.remember_size);
    assert!(!s.window.start_maximized);
    assert_eq!(s.log_level, LogLevelSettings::default());
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
    assert_eq!(result.theme, "polar-night");
}

#[test]
fn test_load_yaml_falls_back_to_default_on_malformed_yaml() {
    let dir = std::env::temp_dir();
    let path = dir.join("geosource_test_malformed.yaml");
    fs::write(&path, b"{{ not valid yaml {{{{").unwrap();
    let result: AppSettings = load_yaml(&path, "test");
    assert_eq!(result.theme, "polar-night");
    let _ = fs::remove_file(&path);
}

#[test]
fn test_save_and_load_roundtrip_via_tempfile() {
    let dir = std::env::temp_dir();
    let path = dir.join("geosource_test_settings_rt.yaml");

    for theme_name in &["snow-storm", "frost", "aurora", "polar-night"] {
        let mut original = AppSettings::default();
        original.theme = (*theme_name).to_string();
        original.language = "fr".into();

        save_yaml(&original, &path, "test").expect("save");

        let loaded: AppSettings = load_yaml(&path, "test");
        assert_eq!(loaded.theme, *theme_name);
        assert_eq!(loaded.language, "fr");
    }

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

#[test]
fn test_log_level_settings() {
    let mut settings = LogLevelSettings::default();
    assert!(!settings.should_log(log::Level::Trace));
    assert!(!settings.should_log(log::Level::Debug));
    assert!(settings.should_log(log::Level::Info));
    assert!(settings.should_log(log::Level::Warn));
    assert!(settings.should_log(log::Level::Error));

    settings.trace = true;
    settings.debug = true;
    assert!(settings.should_log(log::Level::Trace));
    assert!(settings.should_log(log::Level::Debug));

    let yaml_map = "trace: true\ndebug: false\ninfo: true\nwarn: false\nerror: true\n";
    let deserialized_map: LogLevelSettings = serde_yaml::from_str(yaml_map).expect("deserialize map");
    assert!(deserialized_map.should_log(log::Level::Trace));
    assert!(!deserialized_map.should_log(log::Level::Debug));
    assert!(deserialized_map.should_log(log::Level::Info));
    assert!(!deserialized_map.should_log(log::Level::Warn));
    assert!(deserialized_map.should_log(log::Level::Error));

    let yaml_str = "\"debug\"";
    let deserialized_str: LogLevelSettings = serde_yaml::from_str(yaml_str).expect("deserialize string");
    assert!(!deserialized_str.should_log(log::Level::Trace));
    assert!(deserialized_str.should_log(log::Level::Debug));
    assert!(deserialized_str.should_log(log::Level::Info));
}

#[test]
fn test_config_dir_resolution() {
    let dir = resolve_config_dir();
    assert!(dir.ends_with("other/configs") || dir.ends_with("other\\configs"));
}
