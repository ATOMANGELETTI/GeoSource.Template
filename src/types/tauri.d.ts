/// <reference types="react" />
/// <reference types="react-dom" />

/**
 * Tauri global type augmentations.
 * The `__TAURI__` global is injected by the Tauri runtime.
 * Its presence indicates we're running inside a Tauri webview.
 */
declare global {
  interface Window {
    /** Injected by Tauri runtime — presence signals Tauri environment */
    __TAURI__?: Record<string, unknown>;

    /**
     * Tauri IPC invocation bridge.
     * Use the typed @tauri-apps/api wrappers instead of calling this directly.
     */
    __TAURI_INVOKE__?: (cmd: string, args?: Record<string, unknown>) => Promise<unknown>;
  }
}

/**
 * CSS custom property (CSS variable) type helper.
 * Enables type-safe CSS variable references in inline styles.
 */
export type CSSCustomProperty = `--${string}`;

export {};
