import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Titlebar from "@/components/ui/Titlebar/Titlebar";

vi.mock("@/hooks/useTauriWindow", () => ({
  useTauriWindow: () => ({
    isMaximized: false,
    isFocused: true,
    minimize: vi.fn(),
    maximize: vi.fn(),
    close: vi.fn(),
  }),
}));

describe("Titlebar", () => {
  it("renders with default title when title prop is omitted", () => {
    render(<Titlebar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("GeoSource Template")).toBeInTheDocument();
  });

  it("renders custom title when provided", () => {
    render(<Titlebar title="Custom App Title" />);
    expect(screen.getByText("Custom App Title")).toBeInTheDocument();
  });

  it("has data-tauri-drag-region attribute for window movement", () => {
    render(<Titlebar title="Test Header" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-tauri-drag-region");
  });
});
