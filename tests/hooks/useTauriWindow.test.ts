import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTauriWindow } from "@/hooks/useTauriWindow";
import { useWindowStore } from "@/lib/store/windowStore";

vi.mock("@tauri-apps/api/window", () => {
  const mockWin = {
    isMaximized: vi.fn().mockResolvedValue(false),
    onResized: vi.fn().mockImplementation((cb: () => void) => {
      return Promise.resolve(() => {});
    }),
    onFocusChanged: vi.fn().mockImplementation((cb: (evt: { payload: boolean }) => void) => {
      return Promise.resolve(() => {});
    }),
    minimize: vi.fn().mockResolvedValue(undefined),
    toggleMaximize: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
  };

  return {
    getCurrentWindow: vi.fn(() => mockWin),
  };
});

describe("useTauriWindow", () => {
  beforeEach(() => {
    useWindowStore.setState({
      isMaximized: false,
      isFocused: true,
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    delete (window as Record<string, unknown>).__TAURI__;
    delete (window as Record<string, unknown>).__TAURI_INTERNALS__;
  });

  it("returns window store values and action handlers", () => {
    const { result } = renderHook(() => useTauriWindow());

    expect(result.current.isMaximized).toBe(false);
    expect(result.current.isFocused).toBe(true);
    expect(typeof result.current.minimize).toBe("function");
    expect(typeof result.current.maximize).toBe("function");
    expect(typeof result.current.close).toBe("function");
  });

  it("safely handles minimize, maximize, close in non-Tauri environment", async () => {
    const { result } = renderHook(() => useTauriWindow());

    await act(async () => {
      await result.current.minimize();
      await result.current.maximize();
      await result.current.close();
    });

    expect(result.current.isMaximized).toBe(false);
  });

  it("subscribes to window events in Tauri environment", async () => {
    (window as Record<string, unknown>).__TAURI__ = {};

    const { getCurrentWindow } = await import("@tauri-apps/api/window");
    const mockWin = getCurrentWindow();

    const { unmount } = renderHook(() => useTauriWindow());

    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(mockWin.isMaximized).toHaveBeenCalled();
    expect(mockWin.onResized).toHaveBeenCalled();
    expect(mockWin.onFocusChanged).toHaveBeenCalled();

    unmount();
  });

  it("executes Tauri window actions when called in Tauri environment", async () => {
    (window as Record<string, unknown>).__TAURI__ = {};

    const { getCurrentWindow } = await import("@tauri-apps/api/window");
    const mockWin = getCurrentWindow();

    const { result } = renderHook(() => useTauriWindow());

    await act(async () => {
      await result.current.minimize();
    });
    expect(mockWin.minimize).toHaveBeenCalled();

    await act(async () => {
      await result.current.maximize();
    });
    expect(mockWin.toggleMaximize).toHaveBeenCalled();

    await act(async () => {
      await result.current.close();
    });
    expect(mockWin.close).toHaveBeenCalled();
  });
});
