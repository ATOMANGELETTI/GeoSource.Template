use chrono::Local;
use std::fs;
use std::path::PathBuf;

/// Initializes application logging system with dual targets:
/// 1. Terminal stdout with ANSI color codes.
/// 2. Timestamped log file in `other/logs/YYYY-MM-DD_HH-mm-ss.log` (plain text).
pub fn init_logger() -> Result<PathBuf, Box<dyn std::error::Error>> {
    // PRIMARY: exe-sibling `other/` — correct for packaged and portable builds.
    // FALLBACK: project-root via current_dir() — used in dev (exe is deep in target/).
    let root_dir: PathBuf = (|| {
        if let Ok(exe) = std::env::current_exe() {
            if let Some(exe_dir) = exe.parent() {
                if exe_dir.join("other").exists() {
                    return exe_dir.to_path_buf();
                }
            }
        }
        let mut root = std::env::current_dir().unwrap_or_else(|_| PathBuf::from("."));
        if root.ends_with("src-tauri") {
            if let Some(parent) = root.parent() {
                root = parent.to_path_buf();
            }
        }
        root
    })();

    let logs_folder = root_dir.join("other").join("logs");

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

    // Load log_level from settings.yaml if available, defaulting to standard LogLevelSettings
    let settings_path = root_dir.join("other").join("configs").join("settings.yaml");
    let log_level_settings = if settings_path.exists() {
        if let Ok(content) = fs::read_to_string(&settings_path) {
            if let Ok(settings) = serde_yaml::from_str::<crate::config::AppSettings>(&content) {
                settings.log_level
            } else {
                crate::config::LogLevelSettings::default()
            }
        } else {
            crate::config::LogLevelSettings::default()
        }
    } else {
        crate::config::LogLevelSettings::default()
    };

    let dispatch = fern::Dispatch::new()
        .filter(move |metadata| log_level_settings.should_log(metadata.level()))
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

