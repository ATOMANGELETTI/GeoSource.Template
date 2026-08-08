"use client";

import { createContext, useContext, useEffect, type FC, type ReactNode } from "react";
import { logError, logInfo, logDebug, logWarn } from "@/lib/logger";

interface LoggerContextValue {
  logInfo: (message: string, details?: string) => Promise<void>;
  logWarn: (message: string, details?: string) => Promise<void>;
  logError: (message: string, details?: string) => Promise<void>;
  logDebug: (message: string, details?: string) => Promise<void>;
}

const LoggerContext = createContext<LoggerContextValue>({
  logInfo,
  logWarn,
  logError,
  logDebug,
});

export interface LoggerProviderProps {
  children: ReactNode;
}

export const LoggerProvider: FC<LoggerProviderProps> = ({ children }) => {
  useEffect(() => {
    logInfo("LoggerProvider initialized");

    const handleWindowError = (event: ErrorEvent) => {
      logError(
        `Unhandled Error: ${event.message}`,
        `${event.filename}:${event.lineno}:${event.colno}${event.error?.stack ? `\n${event.error.stack}` : ""}`
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);
      const stack = reason instanceof Error ? reason.stack : undefined;
      logError(`Unhandled Promise Rejection: ${message}`, stack);
    };

    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return (
    <LoggerContext.Provider value={{ logInfo, logWarn, logError, logDebug }}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = (): LoggerContextValue => useContext(LoggerContext);
