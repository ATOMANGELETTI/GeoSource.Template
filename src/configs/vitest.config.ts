/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const root = path.resolve(__dirname, "../../");

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [path.resolve(root, "src/lib/test/setup.ts")],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/lib/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "src-tauri/",
        "src/configs/",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
      "@components": path.resolve(root, "src/components"),
      "@hooks": path.resolve(root, "src/hooks"),
      "@lib": path.resolve(root, "src/lib"),
      "@types": path.resolve(root, "src/types"),
      "@providers": path.resolve(root, "src/providers"),
      "@features": path.resolve(root, "src/features"),
      "@tests": path.resolve(root, "tests"),
    },
  },
});
