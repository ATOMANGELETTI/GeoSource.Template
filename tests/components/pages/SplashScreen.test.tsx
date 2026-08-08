import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SplashScreen from "@/app/splashScreen/splash/splash";

// Mock Tauri invoke & utils
vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn().mockResolvedValue(undefined),
}));

describe("SplashScreen Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title 'GeoSource Template'", () => {
    render(<SplashScreen />);
    expect(screen.getByText("GeoSource Template")).toBeInTheDocument();
  });

  it("renders the version subtext badge", () => {
    render(<SplashScreen />);
    expect(screen.getByText(/GeoSpatial Desktop Platform/i)).toBeInTheDocument();
  });

  it("initializes progress bar display", () => {
    render(<SplashScreen />);
    expect(screen.getByText(/%/)).toBeInTheDocument();
  });
});
