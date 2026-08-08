import { create } from "zustand";

interface WindowState {
  /** Whether the main window is currently maximized */
  isMaximized: boolean;
  /** Whether the window is focused */
  isFocused: boolean;
  /** Set the maximized state */
  setMaximized: (maximized: boolean) => void;
  /** Set the focus state */
  setFocused: (focused: boolean) => void;
}

/**
 * Zustand store for tracking window state.
 * Synced by useTauriWindow hook via Tauri event listeners.
 */
export const useWindowStore = create<WindowState>((set) => ({
  isMaximized: false,
  isFocused: true,
  setMaximized: (maximized) => set({ isMaximized: maximized }),
  setFocused: (focused) => set({ isFocused: focused }),
}));
