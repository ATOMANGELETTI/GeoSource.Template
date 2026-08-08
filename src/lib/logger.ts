import { isTauri } from "@/lib/utils";

export type LogLevel = "info" | "warn" | "error" | "debug";

/**
 * Sends a log entry to both the browser console and the Rust backend logger
 * (which prints to terminal stdout and writes to timestamped file in other/logs/).
 */
export async function logEvent(
  level: LogLevel,
  message: string,
  details?: string
): Promise<void> {
  const timestamp = new Date().toLocaleTimeString();
  const consoleMsg = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  switch (level) {
    case "error":
      console.error(consoleMsg, details ?? "");
      break;
    case "warn":
      console.warn(consoleMsg, details ?? "");
      break;
    case "debug":
      // eslint-disable-next-line no-console
      console.debug(consoleMsg, details ?? "");
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(consoleMsg, details ?? "");
      break;
  }

  if (isTauri()) {
    try {
      const core = await import("@tauri-apps/api/core");
      if (core && typeof core.invoke === "function") {
        await core.invoke("log_app_event", {
          level,
          message,
          details: details ?? null,
        });
      }
    } catch {
      // Ignore IPC invocation errors in non-Tauri test environments
    }
  }
}

export const logInfo = (message: string, details?: string) => logEvent("info", message, details);
export const logWarn = (message: string, details?: string) => logEvent("warn", message, details);
export const logError = (message: string, details?: string) => logEvent("error", message, details);
export const logDebug = (message: string, details?: string) => logEvent("debug", message, details);
