mod config;
mod logger;
mod tray;

use tauri::Manager;
use tauri_plugin_window_state::{Builder, StateFlags};

/// Application run function — called from main.rs.
/// Registers all IPC command handlers and initializes plugins.
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

            // Obtain the main window and ensure it is centred and visible,
            // regardless of any previously saved state.
            if let Some(window) = app.get_webview_window("main") {
                // Centre on the primary monitor so the window is always reachable.
                let _ = window.center();
                // Explicitly show the window — this is a no-op if it is already
                // visible, but guarantees visibility when `visible: false` or when
                // the window-state plugin left it hidden.
                let _ = window.show();
                // Bring the window to the front and give it keyboard focus.
                let _ = window.set_focus();
                log::info!(target: "geosource::window", "Main webview window displayed and focused.");
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
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

