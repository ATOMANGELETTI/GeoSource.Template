import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TrayMenuPage from "@/app/tray-menu/page";

describe("TrayMenuPage", () => {
  it("renders tray menu branding and menu options", () => {
    render(<TrayMenuPage />);

    expect(screen.getByText("GeoSource")).toBeInTheDocument();
    expect(screen.getByText("v0.1.0")).toBeInTheDocument();
    expect(screen.getByText("Hide")).toBeInTheDocument();
    expect(screen.getByText("Preferences")).toBeInTheDocument();
    expect(screen.getByText("Check Updates")).toBeInTheDocument();
    expect(screen.getByText("Quit GeoSource")).toBeInTheDocument();
  });
});
