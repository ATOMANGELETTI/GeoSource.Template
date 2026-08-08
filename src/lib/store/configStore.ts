import { create } from "zustand";
import {
  getSettings,
  getBindings,
  getAppInfo,
  setSettings,
  setBindings,
  DEFAULT_SETTINGS,
  DEFAULT_BINDINGS,
  DEFAULT_APPINFO,
  type AppSettings,
  type AppBindings,
  type AppInfo,
} from "@/lib/config";

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------

interface ConfigState {
  settings: AppSettings;
  bindings: AppBindings;
  appInfo: AppInfo;
  /** True while the initial load from the backend is in progress. */
  isLoading: boolean;
  /** Non-null when the last load or save produced an error. */
  error: string | null;
}

interface ConfigActions {
  /** Load all three configs from the Rust backend. Call once on app mount. */
  loadAll: () => Promise<void>;
  /**
   * Merge a partial settings object into state and persist the full settings
   * object to disk via IPC.
   */
  updateSettings: (patch: Partial<AppSettings>) => Promise<void>;
  /**
   * Merge updated bindings into state and persist the full bindings object
   * to disk via IPC.
   */
  updateBindings: (patch: Partial<AppBindings["bindings"]>) => Promise<void>;
  /** Clear any stored error. */
  clearError: () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useConfigStore = create<ConfigState & ConfigActions>((set, get) => ({
  // --- Initial state (defaults used until loadAll() resolves) ---
  settings: DEFAULT_SETTINGS,
  bindings: DEFAULT_BINDINGS,
  appInfo: DEFAULT_APPINFO,
  isLoading: false,
  error: null,

  // --- Actions ---

  loadAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const [settings, bindings, appInfo] = await Promise.all([
        getSettings(),
        getBindings(),
        getAppInfo(),
      ]);
      set({ settings, bindings, appInfo, isLoading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      set({ error: `Failed to load config: ${msg}`, isLoading: false });
    }
  },

  updateSettings: async (patch) => {
    const merged: AppSettings = { ...get().settings, ...patch };
    set({ settings: merged });
    try {
      await setSettings(merged);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      set({ error: `Failed to save settings: ${msg}` });
    }
  },

  updateBindings: async (patch) => {
    const updatedMap: Record<string, string> = { ...get().bindings.bindings };
    if (patch) {
      for (const [key, value] of Object.entries(patch)) {
        if (value !== undefined) {
          updatedMap[key] = value;
        }
      }
    }
    const merged: AppBindings = { bindings: updatedMap };
    set({ bindings: merged });
    try {
      await setBindings(merged);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      set({ error: `Failed to save bindings: ${msg}` });
    }
  },

  clearError: () => set({ error: null }),
}));
