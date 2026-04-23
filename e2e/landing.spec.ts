import { test, expect } from "@playwright/test";

test.describe("Лендинг", () => {
  test("отображает главную страницу", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Telegram/i);
  });

  test("содержит кнопку регистрации", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /подключить/i }),
    ).toBeVisible();
  });

  test("на мобилке контент виден и не обрезан", async ({ page }) => {
    await page.goto("/");
    const body = page.locator("body");
    await expect(body).toBeVisible();
    const scrollWidth = await page.evaluate(
      () => document.body.scrollWidth,
    );
    const clientWidth = await page.evaluate(
      () => document.body.clientWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
