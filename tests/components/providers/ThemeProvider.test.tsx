import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ThemeProvider, normalizeTheme } from "@/providers/ThemeProvider";
import { useConfigStore } from "@/lib/store/configStore";

describe("ThemeProvider", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.className = "";
  });

  describe("normalizeTheme", () => {
    it("maps polar night variants to 'polar-night'", () => {
      expect(normalizeTheme("polar-night")).toBe("polar-night");
      expect(normalizeTheme("polar_night")).toBe("polar-night");
      expect(normalizeTheme("polar night")).toBe("polar-night");
      expect(normalizeTheme("dark")).toBe("polar-night");
    });

    it("maps snow storm variants to 'snow-storm'", () => {
      expect(normalizeTheme("snow-storm")).toBe("snow-storm");
      expect(normalizeTheme("snow_storm")).toBe("snow-storm");
      expect(normalizeTheme("snow storm")).toBe("snow-storm");
      expect(normalizeTheme("light")).toBe("snow-storm");
    });

    it("maps frost and aurora", () => {
      expect(normalizeTheme("frost")).toBe("frost");
      expect(normalizeTheme("aurora")).toBe("aurora");
      expect(normalizeTheme("aroura")).toBe("aurora");
    });

    it("maps system and defaults unknown strings to 'polar-night'", () => {
      expect(normalizeTheme("system")).toBe("system");
      expect(normalizeTheme("unknown-theme")).toBe("polar-night");
      expect(normalizeTheme("")).toBe("polar-night");
    });
  });

  describe("ThemeProvider component", () => {
    beforeEach(() => {
      vi.spyOn(useConfigStore.getState(), "loadAll").mockImplementation(async () => {});
    });

    it("renders children and sets document element attributes", async () => {
      useConfigStore.setState({
        settings: {
          theme: "aurora",
          language: "en",
          window: { remember_size: true, start_maximized: false },
          log_level: { trace: false, debug: false, info: true, warn: true, error: true },
        },
      });

      await act(async () => {
        render(
          <ThemeProvider>
            <div data-testid="child-element">App Content</div>
          </ThemeProvider>
        );
      });

      expect(screen.getByTestId("child-element")).toBeInTheDocument();
      expect(document.documentElement.getAttribute("data-theme")).toBe("aurora");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("applies light class when snow-storm theme is selected", async () => {
      useConfigStore.setState({
        settings: {
          theme: "snow-storm",
          language: "en",
          window: { remember_size: true, start_maximized: false },
          log_level: { trace: false, debug: false, info: true, warn: true, error: true },
        },
      });

      await act(async () => {
        render(
          <ThemeProvider>
            <div>Light Content</div>
          </ThemeProvider>
        );
      });

      expect(document.documentElement.getAttribute("data-theme")).toBe("snow-storm");
      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("resolves system theme based on prefers-color-scheme media query and listens for changes", async () => {
      let changeHandler: (() => void) | undefined;
      const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("light"),
        addEventListener: vi.fn((event, handler) => {
          changeHandler = handler;
        }),
        removeEventListener: vi.fn(),
      }));
      window.matchMedia = matchMediaMock;

      useConfigStore.setState({
        settings: {
          theme: "system",
          language: "en",
          window: { remember_size: true, start_maximized: false },
          log_level: { trace: false, debug: false, info: true, warn: true, error: true },
        },
      });

      let unmountFn: () => void = () => {};
      await act(async () => {
        const { unmount } = render(
          <ThemeProvider>
            <div>System Content</div>
          </ThemeProvider>
        );
        unmountFn = unmount;
      });

      expect(document.documentElement.getAttribute("data-theme")).toBe("snow-storm");
      expect(document.documentElement.classList.contains("light")).toBe(true);

      // Simulate media query change event
      if (changeHandler) {
        await act(async () => {
          changeHandler!();
        });
      }

      await act(async () => {
        unmountFn();
      });
    });
  });
});
