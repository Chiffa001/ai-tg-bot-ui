import { test, expect } from "@playwright/test";
import { setAuthCookies } from "./helpers/auth";
import { localeCases } from "./helpers/locales";

for (const localeCase of localeCases) {
  test.describe(`Auth — guards — ${localeCase.name}`, () => {
    test("неавторизованный пользователь → редирект на /auth/login", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/auth/login\\?next=`),
      );
    });

    test("авторизованный пользователь → редирект с /auth/login на онбординг", async ({
      page,
      context,
    }) => {
      await setAuthCookies(context);
      await page.goto(`/${localeCase.code}/auth/login`);
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/onboarding/`),
      );
    });

    test("авторизованный пользователь → редирект с /auth/register на онбординг", async ({
      page,
      context,
    }) => {
      await setAuthCookies(context);
      await page.goto(`/${localeCase.code}/auth/register`);
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/onboarding/`),
      );
    });
  });

  test.describe(`Auth — страница входа — ${localeCase.name}`, () => {
    test("отображает форму логина", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/login`);
      await expect(
        page.getByRole("heading", { name: localeCase.labels.loginHeading }),
      ).toBeVisible();
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
    });

    test("title страницы — login", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/login`);
      await expect(page).toHaveTitle(localeCase.labels.loginTitle);
    });

    test("title страницы регистрации — register", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/register`);
      await expect(page).toHaveTitle(localeCase.labels.registerTitle);
    });

    test("показывает ошибку при пустой форме", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/login`);
      await page
        .getByRole("button", {
          name: localeCase.labels.loginSubmit,
          exact: true,
        })
        .click();
      await expect(page.locator("form")).toContainText(/.+/);
    });

    test("успешный вход → переход на онбординг", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/login`);
      await page.getByLabel(/email/i).fill("test@example.com");
      await page.locator('input[name="password"]').fill("password123");
      await page
        .getByRole("button", {
          name: localeCase.labels.loginSubmit,
          exact: true,
        })
        .click();
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/onboarding/`),
        { timeout: 5000 },
      );
    });

    test("кнопка Telegram → переход на онбординг", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/login`);
      await page.getByRole("button", { name: /telegram/i }).click();
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/onboarding/`),
        { timeout: 5000 },
      );
    });

    test("ссылка на регистрацию работает", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/login`);
      await page
        .getByRole("link", { name: localeCase.labels.registerLink })
        .click();
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/auth/register`),
      );
    });

    test("на мобилке визуальная панель скрыта, форма видна", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/login`);
      await expect(page.getByLabel(/email/i)).toBeVisible();
    });
  });
}
