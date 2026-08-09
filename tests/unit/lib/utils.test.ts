import { describe, it, expect, afterEach } from "vitest";
import { cn, formatVersion, isTauri } from "@/lib/utils";

describe("utils.ts", () => {
  describe("cn", () => {
    it("combines class strings correctly", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("filters out falsy values (false, null, undefined, empty string)", () => {
      expect(cn("foo", false, "bar", null, undefined, "", "baz")).toBe("foo bar baz");
    });

    it("returns empty string when all arguments are falsy", () => {
      expect(cn(false, null, undefined)).toBe("");
    });
  });

  describe("formatVersion", () => {
    it("adds 'v' prefix if version does not start with 'v'", () => {
      expect(formatVersion("1.0.0")).toBe("v1.0.0");
      expect(formatVersion("0.1.0")).toBe("v0.1.0");
    });

    it("keeps existing 'v' prefix if present", () => {
      expect(formatVersion("v1.0.0")).toBe("v1.0.0");
      expect(formatVersion("v0.2.5")).toBe("v0.2.5");
    });
  });

  describe("isTauri", () => {

    afterEach(() => {
      (window as unknown as Record<string, unknown>).__TAURI__ = undefined;
      (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__ = undefined;
    });

    it("returns false when window is undefined or __TAURI__ keys are missing", () => {
      expect(isTauri()).toBe(false);
    });

    it("returns true when __TAURI__ is present in window", () => {
      (window as unknown as Record<string, unknown>).__TAURI__ = {};
      expect(isTauri()).toBe(true);
    });

    it("returns true when __TAURI_INTERNALS__ is present in window", () => {
      (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__ = {};
      expect(isTauri()).toBe(true);
    });
  });
});
