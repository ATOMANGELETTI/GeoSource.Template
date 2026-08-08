use tauri::{
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    AppHandle, Manager, PhysicalPosition,
};

/// Width and height of the tray-menu webview popover window in physical pixels (approx).
const MENU_WIDTH: i32 = 220;
const MENU_HEIGHT: i32 = 230;

/// Set up system tray icon with custom right-click context menu webview positioning.
pub fn setup_tray(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let mut builder = TrayIconBuilder::new().tooltip("GeoSource Template");

    // Set icon from application default icon if available
    if let Some(icon) = app.default_window_icon() {
        builder = builder.icon(icon.clone());
    }

    builder
        .on_tray_icon_event(|tray, event| {
            match event {
                // Right Click -> Open custom styled tray context menu webview
                TrayIconEvent::Click {
                    button: MouseButton::Right,
                    button_state: MouseButtonState::Up,
                    position,
                    ..
                } => {
                    if let Some(menu_win) = tray.app_handle().get_webview_window("tray-menu") {
                        // Calculate position so menu stays on screen (near tray icon position)
                        let x = (position.x as i32 - MENU_WIDTH / 2).max(10);
                        let y = (position.y as i32 - MENU_HEIGHT - 10).max(10);

                        let target_pos = PhysicalPosition::new(x, y);
                        let _ = menu_win.set_position(target_pos);
                        let _ = menu_win.show();
                        let _ = menu_win.set_focus();
                        log::info!(
                            target: "geosource::tray",
                            "Opened custom tray menu popover at ({}, {})",
                            x,
                            y
                        );
                    }
                }
                // Left Click -> Focus or toggle main window
                TrayIconEvent::Click {
                    button: MouseButton::Left,
                    button_state: MouseButtonState::Up,
                    ..
                } => {
                    if let Some(main_win) = tray.app_handle().get_webview_window("main") {
                        let is_visible = main_win.is_visible().unwrap_or(false);
                        let is_minimized = main_win.is_minimized().unwrap_or(false);

                        if !is_visible || is_minimized {
                            let _ = main_win.unminimize();
                            let _ = main_win.show();
                            let _ = main_win.set_focus();
                            log::info!(target: "geosource::tray", "Restored and focused main window from tray click.");
                        } else {
                            let _ = main_win.set_focus();
                        }
                    }
                }
                _ => {}
            }
        })
        .build(app)?;

    log::info!(target: "geosource::tray", "System tray icon initialized successfully.");
    Ok(())
}
