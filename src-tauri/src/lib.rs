pub mod config;
pub mod logger;
mod tray;

#[cfg(test)]
#[path = "../../tests/backend/config_test.rs"]
mod config_test;

#[cfg(test)]
#[path = "../../tests/backend/logger_test.rs"]
mod logger_test;

use tauri::Manager;
#[cfg(not(test))]
use tauri_plugin_window_state::{Builder, StateFlags};

/// IPC command called by the splashscreen when 7-second minimum duration
/// and application loading are both complete. Shows and focuses the main window
/// and closes the splashscreen window.
#[tauri::command]
#[allow(dead_code)]
async fn close_splash_and_show_main(app_handle: tauri::AppHandle) -> Result<(), String> {
    if let Some(main_window) = app_handle.get_webview_window("main") {
        let (start_maximized, always_on_top) = if let Some(config_state) = app_handle.try_state::<std::sync::Mutex<config::AppConfig>>() {
            if let Ok(cfg) = config_state.lock() {
                (cfg.settings.window.start_maximized, cfg.settings.window.always_on_top)
            } else {
                (false, false)
            }
        } else {
            (false, false)
        };

        if always_on_top {
            let _ = main_window.set_always_on_top(true);
        }

        if start_maximized {
            let _ = main_window.maximize();
        } else {
            let _ = main_window.center();
        }
        let _ = main_window.show();
        let _ = main_window.set_focus();
        log::info!(target: "geosource::window", "Main webview window displayed and focused from splashscreen (start_maximized={}, always_on_top={}).", start_maximized, always_on_top);
    }

    if let Some(splashscreen) = app_handle.get_webview_window("splashscreen") {
        let _ = splashscreen.close();
        log::info!(target: "geosource::splash", "Splashscreen window closed.");
    }

    Ok(())
}

/// Application run function — called from main.rs.
/// Registers all IPC command handlers and initializes plugins.
#[cfg(not(test))]
pub fn run() {
    if let Err(err) = logger::init_logger() {
        eprintln!("Failed to initialize application logger: {}", err);
    }

    log::info!(target: "geosource::app", "Starting GeoSource Tauri application execution...");

    // Restore size and maximized state only — never position or visibility.
    let window_state_flags = StateFlags::SIZE | StateFlags::MAXIMIZED;

    tauri::Builder::default()
        .manage(config::load_config())
        .plugin(Builder::default().with_state_flags(window_state_flags).build())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::AppleScript,
            Some(vec!["--autostart"]),
        ))
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::CloseRequested { .. } => {
                log::info!(target: "geosource::window", "Window close requested for window '{}'", window.label());
            }
            tauri::WindowEvent::Focused(focused) => {
                log::trace!(target: "geosource::window", "Window '{}' focus state changed: focused={}", window.label(), focused);
                // Auto-hide tray menu window when focus is lost
                if window.label() == "tray-menu" && !focused {
                    let _ = window.hide();
                    log::info!(target: "geosource::tray", "Tray menu hidden on focus loss.");
                }
            }
            tauri::WindowEvent::Resized(size) => {
                let is_minimized = window.is_minimized().unwrap_or(false)
                    || (size.width <= 160 && size.height <= 40);
                if is_minimized {
                    log::trace!(
                        target: "geosource::window",
                        "Window '{}' minimized to taskbar (OS boundary: {}x{}).",
                        window.label(),
                        size.width,
                        size.height
                    );
                } else {
                    log::trace!(
                        target: "geosource::window",
                        "Window '{}' resized to width={}, height={}",
                        window.label(),
                        size.width,
                        size.height
                    );
                }
            }
            tauri::WindowEvent::Destroyed => {
                log::info!(target: "geosource::window", "Window '{}' destroyed", window.label());
            }
            _ => {}
        })
        .setup(|app| {
            // Set up system tray icon & custom context menu listener
            if let Err(err) = tray::setup_tray(app.handle()) {
                log::error!(target: "geosource::tray", "Failed to setup system tray: {}", err);
            }

            // Synchronize autostart on startup setting with OS
            use tauri_plugin_autostart::ManagerExt;
            if let Some(config_state) = app.try_state::<std::sync::Mutex<config::AppConfig>>() {
                if let Ok(cfg) = config_state.lock() {
                    let autostart_manager = app.autolaunch();
                    if cfg.settings.system.start_with_windows {
                        let _ = autostart_manager.enable();
                        log::info!(target: "geosource::app", "Autostart on boot is enabled.");
                    } else {
                        let _ = autostart_manager.disable();
                        log::info!(target: "geosource::app", "Autostart on boot is disabled.");
                    }
                }
            }

            // Ensure main window is hidden during splash screen sequence
            if let Some(main_window) = app.get_webview_window("main") {
                let _ = main_window.hide();
            }

            // Ensure splashscreen is centered on primary monitor
            if let Some(splashscreen) = app.get_webview_window("splashscreen") {
                let _ = splashscreen.center();
                let _ = splashscreen.show();
                let _ = splashscreen.set_focus();
                log::info!(target: "geosource::splash", "Splashscreen window initialized, centered, and displayed.");
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            logger::log_app_event,
            config::get_settings,
            config::get_bindings,
            config::get_appinfo,
            config::set_settings,
            config::set_bindings,
            config::open_config_dir,
            config::sync_autostart,
            close_splash_and_show_main,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

