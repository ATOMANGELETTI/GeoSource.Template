import { describe, it, expect, vi, beforeEach } from "vitest";
import { logInfo, logWarn, logError, logDebug } from "./logger";

describe("Logger utility", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls console.log when logInfo is called", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await logInfo("Test info message");
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain("[INFO] Test info message");
  });

  it("calls console.warn when logWarn is called", async () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    await logWarn("Test warn message");
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain("[WARN] Test warn message");
  });

  it("calls console.error when logError is called", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await logError("Test error message", "Error details stack");
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain("[ERROR] Test error message");
    expect(consoleSpy.mock.calls[0][1]).toBe("Error details stack");
  });

  it("calls console.debug when logDebug is called", async () => {
    const consoleSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    await logDebug("Test debug message");
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain("[DEBUG] Test debug message");
  });
});
