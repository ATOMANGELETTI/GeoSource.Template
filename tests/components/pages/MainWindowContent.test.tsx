import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MainWindowContent from "@/app/mainWindow/window/window";

describe("MainWindowContent", () => {
  it("renders main window wordmark and version badge", () => {
    render(<MainWindowContent />);

    expect(screen.getByText("Tauri Template")).toBeInTheDocument();
    expect(screen.getByText("v0.1.0")).toBeInTheDocument();
  });
});
