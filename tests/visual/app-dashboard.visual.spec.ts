import { test, expect } from "@playwright/test";

test.describe("Main Window Dashboard Visual Regression", () => {
  test("should render the main application window with correct layout", async ({ page }) => {
    // Navigate to the main app dashboard
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Wait for main container or layout to render
    const body = page.locator("body");
    await expect(body).toBeVisible();

    // Hide dynamic/blinking elements like cursor or timestamps if any
    await page.evaluate(() => {
      document.body.style.caretColor = "transparent";
    });

    // Capture visual snapshot of main window
    await expect(page).toHaveScreenshot("app-dashboard-full.png", {
      fullPage: true,
    });
  });

  test("should render header and titlebar elements cleanly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle").catch(() => {});

    // Target the main container or header element
    const header = page.locator("header").first();
    if (await header.isVisible()) {
      await expect(header).toHaveScreenshot("app-header.png");
    } else {
      // Fallback to top area snapshot
      await expect(page).toHaveScreenshot("app-top-area.png", {
        clip: { x: 0, y: 0, width: 1280, height: 100 },
      });
    }
  });
});
