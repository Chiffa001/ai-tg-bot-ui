import { test, expect } from "@playwright/test";
import { localeCases } from "./helpers/locales";

test.describe("Лендинг — locale redirect fallback", () => {
  test("missing page без locale → редирект на локализованный 404", async ({
    page,
  }) => {
    await page.goto("/definitely-missing-page");

    await expect(page).toHaveURL(/\/(ru|en|pl)\/definitely-missing-page$/);

    const matchedLocale = page.url().match(/\/(ru|en|pl)\//)?.[1];
    expect(matchedLocale).toBeTruthy();

    const localeCase = localeCases.find(
      ({ code }) => code === matchedLocale,
    );

    expect(localeCase).toBeDefined();

    await expect(
      page.getByRole("heading", {
        name: localeCase!.labels.notFoundTitle,
      }),
    ).toBeVisible();
  });
});

for (const localeCase of localeCases) {
  test.describe(`Localized error redirect — ${localeCase.name}`, () => {
    test("500 без locale → redirect на localized error page", async ({
      browser,
    }) => {
      const context = await browser.newContext({
        baseURL: "http://localhost:3000",
        locale: localeCase.browserLocale,
      });

      try {
        const page = await context.newPage();

        await page.goto("/e2e-test/error");
        await expect(page).toHaveURL(
          new RegExp(`/${localeCase.code}/e2e-test/error$`),
        );
        await expect(
          page.getByRole("heading", {
            name: localeCase.labels.serverErrorTitle,
          }),
        ).toBeVisible();
      } finally {
        await context.close();
      }
    });
  });
}

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
