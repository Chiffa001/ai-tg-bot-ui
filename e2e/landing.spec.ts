import { test, expect } from "@playwright/test";
import { localeCases } from "./helpers/locales";

for (const localeCase of localeCases) {
  test.describe(`Лендинг — ${localeCase.name}`, () => {
    test("отображает главную страницу", async ({ page }) => {
      await page.goto(`/${localeCase.code}`);
      await expect(page).toHaveTitle(/Telegram/i);
    });

    test("содержит кнопку регистрации", async ({ page }) => {
      await page.goto(`/${localeCase.code}`);
      await expect(
        page.getByRole("link", { name: localeCase.labels.start }),
      ).toBeVisible();
    });

    test("на мобилке контент виден и не обрезан", async ({ page }) => {
      await page.goto(`/${localeCase.code}`);
      const body = page.locator("body");
      await expect(body).toBeVisible();
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  });
}
