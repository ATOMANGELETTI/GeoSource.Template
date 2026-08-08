import "@testing-library/jest-dom";

// Mock Tauri window APIs in test environment
Object.defineProperty(window, "__TAURI__", {
  value: undefined,
  writable: true,
});
Object.defineProperty(window, "__TAURI_INTERNALS__", {
  value: undefined,
  writable: true,
});
