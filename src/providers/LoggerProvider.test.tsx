import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoggerProvider, useLogger } from "./LoggerProvider";
import React from "react";

const TestChildComponent = () => {
  const { logInfo } = useLogger();
  return (
    <button onClick={() => logInfo("Child click")}>
      Click Me
    </button>
  );
};

describe("LoggerProvider", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children properly", () => {
    render(
      <LoggerProvider>
        <div>Test Content</div>
      </LoggerProvider>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("provides logger context to child components", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(
      <LoggerProvider>
        <TestChildComponent />
      </LoggerProvider>
    );
    const button = screen.getByText("Click Me");
    button.click();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("[INFO] Child click"),
      ""
    );
  });
});
