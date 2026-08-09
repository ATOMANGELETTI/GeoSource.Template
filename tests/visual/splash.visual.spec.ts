import { test, expect } from "@playwright/test";

test.describe("Splash Screen Visual Regression", () => {
  test("should render Next.js splash screen route visually correct", async ({ page }) => {
    await page.goto("/splashScreen");
    await page.waitForLoadState("domcontentloaded");

    const body = page.locator("body");
    await expect(body).toBeVisible();

    await expect(page).toHaveScreenshot("splash-screen-route.png");
  });

  test("should render static splash.html page visually correct", async ({ page }) => {
    await page.goto("/splash.html");
    await page.waitForLoadState("domcontentloaded");

    const body = page.locator("body");
    await expect(body).toBeVisible();

    await expect(page).toHaveScreenshot("splash-html-page.png");
  });
});
