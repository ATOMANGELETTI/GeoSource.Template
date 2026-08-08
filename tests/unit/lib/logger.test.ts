import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logEvent, logInfo, logWarn, logError, logDebug } from "@/lib/logger";

describe("logger.ts", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs info messages to console.log", async () => {
    await logInfo("System initialized", "details info");
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("[INFO] System initialized"),
      "details info"
    );
  });

  it("logs warn messages to console.warn", async () => {
    await logWarn("Warning payload", "warning details");
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("[WARN] Warning payload"),
      "warning details"
    );
  });

  it("logs error messages to console.error", async () => {
    await logError("Unhandled exception", "stack trace");
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("[ERROR] Unhandled exception"),
      "stack trace"
    );
  });

  it("logs debug messages to console.debug", async () => {
    await logDebug("Debugging state");
    expect(console.debug).toHaveBeenCalledTimes(1);
    expect(console.debug).toHaveBeenCalledWith(
      expect.stringContaining("[DEBUG] Debugging state"),
      ""
    );
  });

  it("handles logEvent with default level fallback", async () => {
    await logEvent("info", "Generic log");
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("[INFO] Generic log"),
      ""
    );
  });
});
