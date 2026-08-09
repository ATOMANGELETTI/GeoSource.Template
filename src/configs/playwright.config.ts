import { defineConfig, devices } from "@playwright/test";
import path from "path";

const rootDir = path.resolve(__dirname, "../../");

export default defineConfig({
  testDir: path.resolve(rootDir, "tests/visual"),
  outputDir: path.resolve(rootDir, "tests/artifacts/playwright-results"),
  snapshotPathTemplate: "{testDir}/__snapshots__/{testFilePath}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [
      "html",
      {
        outputFolder: path.resolve(rootDir, "tests/artifacts/playwright-report"),
        open: "never",
      },
    ],
    ["list"],
  ],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
      animations: "disabled",
    },
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    viewport: { width: 1280, height: 720 },
    colorScheme: "dark",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
