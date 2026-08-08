import { describe, it, expect, beforeEach } from "vitest";
import { useWindowStore } from "@/lib/store/windowStore";

describe("windowStore.ts", () => {
  beforeEach(() => {
    useWindowStore.setState({
      isMaximized: false,
      isFocused: true,
    });
  });

  it("has correct initial state", () => {
    const state = useWindowStore.getState();
    expect(state.isMaximized).toBe(false);
    expect(state.isFocused).toBe(true);
  });

  it("setMaximized updates isMaximized flag", () => {
    useWindowStore.getState().setMaximized(true);
    expect(useWindowStore.getState().isMaximized).toBe(true);

    useWindowStore.getState().setMaximized(false);
    expect(useWindowStore.getState().isMaximized).toBe(false);
  });

  it("setFocused updates isFocused flag", () => {
    useWindowStore.getState().setFocused(false);
    expect(useWindowStore.getState().isFocused).toBe(false);

    useWindowStore.getState().setFocused(true);
    expect(useWindowStore.getState().isFocused).toBe(true);
  });
});
