import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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
} from "@/lib/config";

vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));

import { invoke } from "@tauri-apps/api/core";

describe("config.ts", () => {
  afterEach(() => {
    (window as unknown as Record<string, unknown>).__TAURI__ = undefined;
    (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__ = undefined;
    vi.clearAllMocks();
  });

  describe("Non-Tauri environment", () => {
    it("returns DEFAULT_SETTINGS when not running in Tauri", async () => {
      const settings = await getSettings();
      expect(settings).toEqual(DEFAULT_SETTINGS);
      expect(invoke).not.toHaveBeenCalled();
    });

    it("returns DEFAULT_BINDINGS when not running in Tauri", async () => {
      const bindings = await getBindings();
      expect(bindings).toEqual(DEFAULT_BINDINGS);
      expect(invoke).not.toHaveBeenCalled();
    });

    it("returns DEFAULT_APPINFO when not running in Tauri", async () => {
      const info = await getAppInfo();
      expect(info).toEqual(DEFAULT_APPINFO);
      expect(invoke).not.toHaveBeenCalled();
    });

    it("does not trigger IPC when setSettings is called outside Tauri", async () => {
      await setSettings(DEFAULT_SETTINGS);
      expect(invoke).not.toHaveBeenCalled();
    });

    it("does not trigger IPC when setBindings is called outside Tauri", async () => {
      await setBindings(DEFAULT_BINDINGS);
      expect(invoke).not.toHaveBeenCalled();
    });
  });

  describe("Tauri environment", () => {
    beforeEach(() => {
      (window as unknown as Record<string, unknown>).__TAURI__ = {};
    });

    it("invokes 'get_settings' IPC command when in Tauri", async () => {
      const mockSettings: AppSettings = {
        theme: "frost",
        language: "fr",
        window: { remember_size: false, start_maximized: true },
        log_level: "debug",
      };
      vi.mocked(invoke).mockResolvedValueOnce(mockSettings);

      const result = await getSettings();
      expect(invoke).toHaveBeenCalledWith("get_settings", undefined);
      expect(result).toEqual(mockSettings);
    });

    it("invokes 'get_bindings' IPC command when in Tauri", async () => {
      const mockBindings: AppBindings = { bindings: { toggle_sidebar: "Ctrl+Shift+B" } };
      vi.mocked(invoke).mockResolvedValueOnce(mockBindings);

      const result = await getBindings();
      expect(invoke).toHaveBeenCalledWith("get_bindings", undefined);
      expect(result).toEqual(mockBindings);
    });

    it("invokes 'get_appinfo' IPC command when in Tauri", async () => {
      const mockInfo = { version: "1.0.0", codename: "Atlas", build: "stable", description: "GeoSource App" };
      vi.mocked(invoke).mockResolvedValueOnce(mockInfo);

      const result = await getAppInfo();
      expect(invoke).toHaveBeenCalledWith("get_appinfo", undefined);
      expect(result).toEqual(mockInfo);
    });

    it("invokes 'set_settings' IPC command when setSettings is called", async () => {
      vi.mocked(invoke).mockResolvedValueOnce(undefined);

      await setSettings(DEFAULT_SETTINGS);
      expect(invoke).toHaveBeenCalledWith("set_settings", { settings: DEFAULT_SETTINGS });
    });

    it("invokes 'set_bindings' IPC command when setBindings is called", async () => {
      vi.mocked(invoke).mockResolvedValueOnce(undefined);

      await setBindings(DEFAULT_BINDINGS);
      expect(invoke).toHaveBeenCalledWith("set_bindings", { bindings: DEFAULT_BINDINGS });
    });
  });
});
