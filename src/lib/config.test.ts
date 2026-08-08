import { describe, it, expect, vi, beforeEach } from "vitest";
import { openConfigDir, getSettings, getBindings, getAppInfo } from "./config";

describe("Config API", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("openConfigDir resolves without error in non-Tauri browser environment", async () => {
    await expect(openConfigDir()).resolves.toBeUndefined();
  });

  it("returns default settings in non-Tauri environment", async () => {
    const settings = await getSettings();
    expect(settings.theme).toBe("polar-night");
  });

  it("returns default bindings in non-Tauri environment", async () => {
    const bindings = await getBindings();
    expect(bindings.bindings).toHaveProperty("toggle_sidebar");
  });

  it("returns default appinfo in non-Tauri environment", async () => {
    const appInfo = await getAppInfo();
    expect(appInfo.version).toBe("0.1.0");
  });
});
