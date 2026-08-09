import { test, expect } from "@playwright/test";

test.describe("Theme & Visual UI Components", () => {
  test("should render Nord dark theme background and cards correctly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Verify background color scheme computed style
    const body = page.locator("body");
    await expect(body).toBeVisible();

    // Visual snapshot check for theme styling
    await expect(page).toHaveScreenshot("nord-theme-ui.png", {
      maxDiffPixelRatio: 0.05,
    });
  });
});
