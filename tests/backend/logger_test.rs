use crate::logger::*;

#[test]
fn test_init_logger_creates_log_file_with_iso_timestamp() {
    let log_path = init_logger().expect("init_logger should succeed");
    assert!(log_path.exists(), "Log file should exist at {:?}", log_path);

    let filename = log_path.file_name().unwrap().to_str().unwrap();
    assert!(
        filename.ends_with(".log"),
        "Filename should end with .log, got: {}",
        filename
    );
    assert!(
        filename.starts_with("20"),
        "Filename should start with ISO year YYYY, got: {}",
        filename
    );
}

#[test]
fn test_log_app_event_handles_various_levels_and_details() {
    log_app_event("info".to_string(), "Test info msg".to_string(), None);
    log_app_event(
        "error".to_string(),
        "Test error msg".to_string(),
        Some("stack trace details".to_string()),
    );
    log_app_event("warn".to_string(), "Test warn msg".to_string(), None);
    log_app_event("debug".to_string(), "Test debug msg".to_string(), None);
}

#[test]
fn test_archiving_previous_log_files() {
    let active_log = init_logger().expect("init_logger should succeed");
    let parent_dir = active_log.parent().expect("Should have parent dir");
    let archive_dir = parent_dir.join("archive");

    assert!(archive_dir.exists(), "Archive folder should exist");
    assert_eq!(active_log.parent().unwrap(), parent_dir);
}
