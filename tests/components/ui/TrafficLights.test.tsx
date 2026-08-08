import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TrafficLights from "@/components/ui/Titlebar/TrafficLights";

describe("TrafficLights", () => {
  it("renders close, minimize, maximize buttons with proper aria labels", () => {
    render(<TrafficLights onClose={() => {}} onMinimize={() => {}} onMaximize={() => {}} />);

    expect(screen.getByRole("button", { name: /close window/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /minimize window/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /maximize window/i })).toBeInTheDocument();
  });

  it("calls onClose handler when close button is clicked", () => {
    const handleClose = vi.fn();
    render(<TrafficLights onClose={handleClose} onMinimize={() => {}} onMaximize={() => {}} />);

    const closeBtn = screen.getByRole("button", { name: /close window/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onMinimize handler when minimize button is clicked", () => {
    const handleMinimize = vi.fn();
    render(<TrafficLights onClose={() => {}} onMinimize={handleMinimize} onMaximize={() => {}} />);

    const minimizeBtn = screen.getByRole("button", { name: /minimize window/i });
    fireEvent.click(minimizeBtn);
    expect(handleMinimize).toHaveBeenCalledTimes(1);
  });

  it("calls onMaximize handler when maximize button is clicked", () => {
    const handleMaximize = vi.fn();
    render(<TrafficLights onClose={() => {}} onMinimize={() => {}} onMaximize={handleMaximize} />);

    const maximizeBtn = screen.getByRole("button", { name: /maximize window/i });
    fireEvent.click(maximizeBtn);
    expect(handleMaximize).toHaveBeenCalledTimes(1);
  });

  it("handles mouse enter and mouse leave events on all traffic buttons", () => {
    render(<TrafficLights onClose={vi.fn()} onMinimize={vi.fn()} onMaximize={vi.fn()} />);

    const closeBtn = screen.getByRole("button", { name: /close window/i });
    const minimizeBtn = screen.getByRole("button", { name: /minimize window/i });
    const maximizeBtn = screen.getByRole("button", { name: /maximize window/i });

    fireEvent.mouseEnter(closeBtn);
    expect(closeBtn.style.filter).toBe("brightness(1.25)");
    fireEvent.mouseLeave(closeBtn);
    expect(closeBtn.style.filter).toBe("brightness(1)");

    fireEvent.mouseEnter(minimizeBtn);
    expect(minimizeBtn.style.filter).toBe("brightness(1.25)");
    fireEvent.mouseLeave(minimizeBtn);
    expect(minimizeBtn.style.filter).toBe("brightness(1)");

    fireEvent.mouseEnter(maximizeBtn);
    expect(maximizeBtn.style.filter).toBe("brightness(1.25)");
    fireEvent.mouseLeave(maximizeBtn);
    expect(maximizeBtn.style.filter).toBe("brightness(1)");
  });
});
