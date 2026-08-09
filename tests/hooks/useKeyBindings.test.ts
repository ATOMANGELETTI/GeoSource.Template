import { describe, it, expect } from "vitest";
import { parseAccelerator, matchesAccelerator } from "@/hooks/useKeyBindings";

describe("useKeyBindings", () => {
  describe("parseAccelerator", () => {
    it("parses single key with Ctrl modifier", () => {
      const parsed = parseAccelerator("Ctrl+B");
      expect(parsed.ctrlKey).toBe(true);
      expect(parsed.shiftKey).toBe(false);
      expect(parsed.altKey).toBe(false);
      expect(parsed.metaKey).toBe(false);
      expect(parsed.key).toBe("b");
    });

    it("parses multiple modifiers", () => {
      const parsed = parseAccelerator("Ctrl+Shift+P");
      expect(parsed.ctrlKey).toBe(true);
      expect(parsed.shiftKey).toBe(true);
      expect(parsed.altKey).toBe(false);
      expect(parsed.key).toBe("p");
    });

    it("parses Alt+F4", () => {
      const parsed = parseAccelerator("Alt+F4");
      expect(parsed.altKey).toBe(true);
      expect(parsed.key).toBe("f4");
    });
  });

  describe("matchesAccelerator", () => {
    it("matches Ctrl+B event", () => {
      const event = new KeyboardEvent("keydown", {
        key: "b",
        code: "KeyB",
        ctrlKey: true,
      });
      expect(matchesAccelerator(event, "Ctrl+B")).toBe(true);
    });

    it("does not match if modifier is missing", () => {
      const event = new KeyboardEvent("keydown", {
        key: "b",
        code: "KeyB",
        ctrlKey: false,
      });
      expect(matchesAccelerator(event, "Ctrl+B")).toBe(false);
    });

    it("matches Ctrl+, event", () => {
      const event = new KeyboardEvent("keydown", {
        key: ",",
        code: "Comma",
        ctrlKey: true,
      });
      expect(matchesAccelerator(event, "Ctrl+,")).toBe(true);
    });

    it("matches F11 event for toggle_fullscreen", () => {
      const event = new KeyboardEvent("keydown", {
        key: "F11",
        code: "F11",
      });
      expect(matchesAccelerator(event, "F11")).toBe(true);
    });

    it("matches F12 event for toggle_devtools", () => {
      const event = new KeyboardEvent("keydown", {
        key: "F12",
        code: "F12",
      });
      expect(matchesAccelerator(event, "F12")).toBe(true);
    });

    it("matches Ctrl+= event for zoom_in", () => {
      const event = new KeyboardEvent("keydown", {
        key: "=",
        code: "Equal",
        ctrlKey: true,
      });
      expect(matchesAccelerator(event, "Ctrl+=")).toBe(true);
    });
  });
});
