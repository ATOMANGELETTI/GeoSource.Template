import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
import { LoggerProvider, useLogger } from "@/providers/LoggerProvider";

describe("LoggerProvider", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children properly and logs initialization", () => {
    render(
      <LoggerProvider>
        <span data-testid="logger-child">Child Element</span>
      </LoggerProvider>
    );

    expect(screen.getByTestId("logger-child")).toBeInTheDocument();
    expect(screen.getByText("Child Element")).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("[INFO] LoggerProvider initialized"),
      ""
    );
  });

  it("provides logger context methods through useLogger hook", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LoggerProvider>{children}</LoggerProvider>
    );
    const { result } = renderHook(() => useLogger(), { wrapper });

    expect(typeof result.current.logInfo).toBe("function");
    expect(typeof result.current.logWarn).toBe("function");
    expect(typeof result.current.logError).toBe("function");
    expect(typeof result.current.logDebug).toBe("function");
  });

  it("captures unhandled window error events", () => {
    render(
      <LoggerProvider>
        <div>Content</div>
      </LoggerProvider>
    );

    const errorEvent = new ErrorEvent("error", {
      message: "Uncaught error test",
      filename: "app.js",
      lineno: 10,
      colno: 5,
      error: new Error("Uncaught error test"),
    });

    window.dispatchEvent(errorEvent);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("[ERROR] Unhandled Error: Uncaught error test"),
      expect.stringContaining("app.js:10:5")
    );
  });

  it("captures unhandled promise rejection events with Error and non-Error reasons", () => {
    render(
      <LoggerProvider>
        <div>Content</div>
      </LoggerProvider>
    );

    const dummyPromise = Promise.resolve();
    // Prevent unhandled promise rejection warning in node runtime
    dummyPromise.catch(() => {});

    const rejectionEventError = new PromiseRejectionEvent("unhandledrejection", {
      promise: dummyPromise,
      reason: new Error("Async rejection"),
    });
    window.dispatchEvent(rejectionEventError);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("[ERROR] Unhandled Promise Rejection: Async rejection"),
      expect.stringContaining("Async rejection")
    );

    const rejectionEventString = new PromiseRejectionEvent("unhandledrejection", {
      promise: dummyPromise,
      reason: "String rejection reason",
    });
    window.dispatchEvent(rejectionEventString);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("[ERROR] Unhandled Promise Rejection: String rejection reason"),
      ""
    );
  });
});
