use chrono::Local;
use std::fs;
use std::path::PathBuf;

/// Initializes application logging system with dual targets:
/// 1. Terminal stdout with ANSI color codes.
/// 2. Timestamped log file in `other/logs/YYYY-MM-DD_HH-mm-ss.log` (plain text).
pub fn init_logger() -> Result<PathBuf, Box<dyn std::error::Error>> {
    let mut root_dir = std::env::current_dir().unwrap_or_else(|_| PathBuf::from("."));

    // Step up to project root if execution directory is inside `src-tauri`
    if root_dir.ends_with("src-tauri") {
        if let Some(parent) = root_dir.parent() {
            root_dir = parent.to_path_buf();
        }
    }

    // Also check executable parent directory for packaged application root
    let logs_folder = if root_dir.join("other").exists() || !std::env::current_exe().is_ok() {
        root_dir.join("other").join("logs")
    } else if let Ok(exe_path) = std::env::current_exe() {
        if let Some(exe_dir) = exe_path.parent() {
            exe_dir.join("other").join("logs")
        } else {
            root_dir.join("other").join("logs")
        }
    } else {
        root_dir.join("other").join("logs")
    };

    fs::create_dir_all(&logs_folder)?;
    let archive_folder = logs_folder.join("archive");
    fs::create_dir_all(&archive_folder)?;

    // Archive any existing log files in `other/logs/` before creating a new log file
    if let Ok(entries) = fs::read_dir(&logs_folder) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_file() && path.extension().and_then(|s| s.to_str()) == Some("log") {
                let dest_path = archive_folder.join(entry.file_name());
                if fs::rename(&path, &dest_path).is_err()
                    && fs::copy(&path, &dest_path).is_ok()
                {
                    let _ = fs::remove_file(&path);
                }
            }
        }
    }

    let now = Local::now();
    let filename = format!("{}.log", now.format("%Y-%m-%d_%H-%M-%S"));
    let log_file_path = logs_folder.join(filename);

    let colors = fern::colors::ColoredLevelConfig::new()
        .error(fern::colors::Color::Red)
        .warn(fern::colors::Color::Yellow)
        .info(fern::colors::Color::Green)
        .debug(fern::colors::Color::Cyan)
        .trace(fern::colors::Color::White);

    let log_file_path_clone = log_file_path.clone();

    // Configure dispatchers: file dispatcher (plain text) and stdout dispatcher (colored)
    let file_dispatch = fern::Dispatch::new()
        .format(|out, message, record| {
            let level_str = match record.level() {
                log::Level::Error => "ERROR",
                log::Level::Warn => "WARN ",
                log::Level::Info => "INFO ",
                log::Level::Debug => "DEBUG",
                log::Level::Trace => "TRACE",
            };
            out.finish(format_args!(
                "[{} {} {}] {}",
                chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                level_str,
                record.target(),
                message
            ))
        })
        .chain(fern::log_file(&log_file_path)?);

    let stdout_dispatch = fern::Dispatch::new()
        .format(move |out, message, record| {
            out.finish(format_args!(
                "[{} {:<5} {}] {}",
                chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                colors.color(record.level()),
                record.target(),
                message
            ))
        })
        .chain(std::io::stdout());

    let dispatch = fern::Dispatch::new()
        .level(log::LevelFilter::Info)
        .level_for("geosource", log::LevelFilter::Debug)
        .level_for("geosource::window", log::LevelFilter::Info)
        .level_for("frontend", log::LevelFilter::Debug)
        .level_for("tao", log::LevelFilter::Warn)
        .level_for("wry", log::LevelFilter::Warn)
        .level_for("hyper", log::LevelFilter::Warn)
        .level_for("h2", log::LevelFilter::Warn)
        .chain(file_dispatch)
        .chain(stdout_dispatch);

    match dispatch.apply() {
        Ok(()) => {
            log::info!(target: "geosource::app", "Logger initialized. Output log file: {:?}", log_file_path_clone);
        }
        Err(err) => {
            eprintln!("Logger initialization skipped (already active): {}", err);
        }
    }

    Ok(log_file_path_clone)
}

/// IPC command exposed to frontend to submit frontend log events.
#[tauri::command]
pub fn log_app_event(level: String, message: String, details: Option<String>) {
    let formatted_msg = match details {
        Some(d) if !d.trim().is_empty() => format!("{} | details: {}", message, d),
        _ => message,
    };

    match level.to_lowercase().as_str() {
        "error" => log::error!(target: "frontend", "{}", formatted_msg),
        "warn" | "warning" => log::warn!(target: "frontend", "{}", formatted_msg),
        "debug" => log::debug!(target: "frontend", "{}", formatted_msg),
        "trace" => log::trace!(target: "frontend", "{}", formatted_msg),
        _ => log::info!(target: "frontend", "{}", formatted_msg),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_init_logger_creates_log_file_with_iso_timestamp() {
        let log_path = init_logger().expect("init_logger should succeed");
        assert!(log_path.exists(), "Log file should exist at {:?}", log_path);

        let filename = log_path.file_name().unwrap().to_str().unwrap();
        // Filename format: YYYY-MM-DD_HH-mm-ss.log (e.g. 2026-08-07_00-49-45.log)
        assert!(
            filename.ends_with(".log"),
            "Filename should end with .log, got: {}",
            filename
        );
        // ISO format date starts with 4 digits for year (20XX)
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
        // Verify active log file is directly under `other/logs/`
        assert_eq!(active_log.parent().unwrap(), parent_dir);
    }
}
