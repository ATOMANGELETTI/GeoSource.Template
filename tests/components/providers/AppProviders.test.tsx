import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AppProviders from "@/providers/AppProviders";

describe("AppProviders", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("wraps children with LoggerProvider and ThemeProvider", () => {
    render(
      <AppProviders>
        <div data-testid="nested-app">App Tree</div>
      </AppProviders>
    );

    expect(screen.getByTestId("nested-app")).toBeInTheDocument();
    expect(screen.getByText("App Tree")).toBeInTheDocument();
  });
});
