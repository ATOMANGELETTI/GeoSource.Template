import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useConfigStore } from "@/lib/store/configStore";
import * as configLib from "@/lib/config";

vi.mock("@/lib/config", async (importOriginal) => {
  const actual = await importOriginal<typeof configLib>();
  return {
    ...actual,
    getSettings: vi.fn(),
    getBindings: vi.fn(),
    getAppInfo: vi.fn(),
    setSettings: vi.fn(),
    setBindings: vi.fn(),
  };
});

describe("configStore.ts", () => {
  beforeEach(() => {
    useConfigStore.setState({
      settings: configLib.DEFAULT_SETTINGS,
      bindings: configLib.DEFAULT_BINDINGS,
      appInfo: configLib.DEFAULT_APPINFO,
      isLoading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  it("initializes with default state", () => {
    const state = useConfigStore.getState();
    expect(state.settings).toEqual(configLib.DEFAULT_SETTINGS);
    expect(state.bindings).toEqual(configLib.DEFAULT_BINDINGS);
    expect(state.appInfo).toEqual(configLib.DEFAULT_APPINFO);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("loadAll successfully populates store from getSettings, getBindings, getAppInfo", async () => {
    const mockSettings: configLib.AppSettings = {
      theme: "aurora",
      language: "de",
      window: { remember_size: true, start_maximized: true },
      log_level: "debug",
    };
    const mockBindings: configLib.AppBindings = {
      bindings: { toggle_sidebar: "Ctrl+Shift+B" },
    };
    const mockAppInfo: configLib.AppInfo = {
      version: "0.2.0",
      codename: "Borealis",
      build: "stable",
      description: "Test App",
    };

    vi.mocked(configLib.getSettings).mockResolvedValueOnce(mockSettings);
    vi.mocked(configLib.getBindings).mockResolvedValueOnce(mockBindings);
    vi.mocked(configLib.getAppInfo).mockResolvedValueOnce(mockAppInfo);

    await useConfigStore.getState().loadAll();

    const state = useConfigStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.settings).toEqual(mockSettings);
    expect(state.bindings).toEqual(mockBindings);
    expect(state.appInfo).toEqual(mockAppInfo);
  });

  it("loadAll sets error state on fetch failure", async () => {
    vi.mocked(configLib.getSettings).mockRejectedValueOnce(new Error("Network error"));

    await useConfigStore.getState().loadAll();

    const state = useConfigStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Failed to load config: Network error");
  });

  it("updateSettings merges patch and persists changes", async () => {
    vi.mocked(configLib.setSettings).mockResolvedValueOnce(undefined);

    await useConfigStore.getState().updateSettings({ theme: "snow-storm" });

    const state = useConfigStore.getState();
    expect(state.settings.theme).toBe("snow-storm");
    expect(configLib.setSettings).toHaveBeenCalledWith({
      ...configLib.DEFAULT_SETTINGS,
      theme: "snow-storm",
    });
  });

  it("updateSettings sets error when saving fails", async () => {
    vi.mocked(configLib.setSettings).mockRejectedValueOnce(new Error("Disk full"));

    await useConfigStore.getState().updateSettings({ theme: "frost" });

    const state = useConfigStore.getState();
    expect(state.error).toBe("Failed to save settings: Disk full");
  });

  it("updateBindings updates key bindings and persists changes", async () => {
    vi.mocked(configLib.setBindings).mockResolvedValueOnce(undefined);

    await useConfigStore.getState().updateBindings({ quit: "Ctrl+Q" });

    const state = useConfigStore.getState();
    expect(state.bindings.bindings.quit).toBe("Ctrl+Q");
    expect(configLib.setBindings).toHaveBeenCalledWith({
      bindings: {
        ...configLib.DEFAULT_BINDINGS.bindings,
        quit: "Ctrl+Q",
      },
    });
  });

  it("updateBindings sets error when saving fails", async () => {
    vi.mocked(configLib.setBindings).mockRejectedValueOnce(new Error("Bindings save failed"));

    await useConfigStore.getState().updateBindings({ quit: "Alt+Q" });

    const state = useConfigStore.getState();
    expect(state.error).toBe("Failed to save bindings: Bindings save failed");
  });

  it("clearError resets error field to null", () => {
    useConfigStore.setState({ error: "Some error" });
    useConfigStore.getState().clearError();
    expect(useConfigStore.getState().error).toBeNull();
  });
});
