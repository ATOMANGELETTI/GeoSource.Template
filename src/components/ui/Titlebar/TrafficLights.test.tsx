import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TrafficLights from "@/components/ui/Titlebar/TrafficLights";

describe("TrafficLights", () => {
  it("renders all three traffic light buttons", () => {
    const onClose = vi.fn();
    const onMinimize = vi.fn();
    const onMaximize = vi.fn();

    render(
      <TrafficLights
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
      />,
    );

    expect(screen.getByLabelText("Close window")).toBeInTheDocument();
    expect(screen.getByLabelText("Minimize window")).toBeInTheDocument();
    expect(screen.getByLabelText("Maximize window")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <TrafficLights
        onClose={onClose}
        onMinimize={vi.fn()}
        onMaximize={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByLabelText("Close window"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onMinimize when minimize button is clicked", () => {
    const onMinimize = vi.fn();
    render(
      <TrafficLights
        onClose={vi.fn()}
        onMinimize={onMinimize}
        onMaximize={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByLabelText("Minimize window"));
    expect(onMinimize).toHaveBeenCalledTimes(1);
  });

  it("calls onMaximize when maximize button is clicked", () => {
    const onMaximize = vi.fn();
    render(
      <TrafficLights
        onClose={vi.fn()}
        onMinimize={vi.fn()}
        onMaximize={onMaximize}
      />,
    );
    fireEvent.click(screen.getByLabelText("Maximize window"));
    expect(onMaximize).toHaveBeenCalledTimes(1);
  });
});
