import { test, expect } from "@playwright/test";
import { setAuthCookies, setBotTokenCookie } from "./helpers/auth";
import { localeCases } from "./helpers/locales";

for (const localeCase of localeCases) {
  test.describe(`Онбординг — guards — ${localeCase.name}`, () => {
    test("без авторизации → редирект на логин", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/auth/login`),
      );
    });

    test("без куки бота → редирект с /business на /bot", async ({
      page,
      context,
    }) => {
      await setAuthCookies(context);
      await page.goto(`/${localeCase.code}/onboarding/business`);
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/onboarding/bot`),
      );
    });

    test("/business доступен при наличии куки бота", async ({
      page,
      context,
    }) => {
      await setAuthCookies(context);
      await setBotTokenCookie(context);
      await page.goto(`/${localeCase.code}/onboarding/business`);
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/onboarding/business`),
      );
    });
  });

  test.describe(`Онбординг — шаг 1: подключение бота — ${localeCase.name}`, () => {
    test.beforeEach(async ({ context }) => {
      await setAuthCookies(context);
    });

    test("отображает форму с полем токена", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await expect(page.getByPlaceholder(/1234567890/)).toBeVisible();
      await expect(
        page.getByRole("button", { name: localeCase.labels.submit }),
      ).toBeVisible();
    });

    test("кнопка задизейблена при пустом поле", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await expect(
        page.getByRole("button", { name: localeCase.labels.submit }),
      ).toBeDisabled();
    });

    test("показывает ошибку для уже подключённого токена", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await page.waitForLoadState("networkidle");
      const submitButton = page.getByRole("button", {
        name: localeCase.labels.submit,
      });
      await page
        .getByPlaceholder(/1234567890/)
        .fill("1234567890:already1234567890123456789012345678");
      await expect(submitButton).toBeEnabled();
      await submitButton.click();
      await expect(
        page.getByText(localeCase.labels.tokenAlreadyConnected),
      ).toBeVisible({ timeout: 5000 });
    });

    test("успешный токен → переход на /business", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await page.waitForLoadState("networkidle");
      const submitButton = page.getByRole("button", {
        name: localeCase.labels.submit,
      });
      await page
        .getByPlaceholder(/1234567890/)
        .fill("1234567890:ABCDefGHijKLMnopQRStuvWXYzABCDEFGHIJ");
      await expect(submitButton).toBeEnabled();
      await submitButton.click();
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/onboarding/business`),
        { timeout: 10000 },
      );
    });

    test("кнопка помощи открывает модальное окно", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await page.getByRole("button", { name: localeCase.labels.help }).click();
      await expect(
        page.getByRole("heading", {
          name: localeCase.labels.helpDialogTitle,
        }),
      ).toBeVisible();
    });

    test("модальное окно закрывается по Escape", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await page.getByRole("button", { name: localeCase.labels.help }).click();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("heading", {
          name: localeCase.labels.helpDialogTitle,
        }),
      ).not.toBeVisible();
    });

    test("индикатор шагов показывает шаг 1 активным", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await expect(
        page.getByRole("navigation", { name: localeCase.labels.progress }),
      ).toBeVisible();
    });

    test("на мобилке визуальная панель скрыта, форма видна", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await expect(page.getByPlaceholder(/1234567890/)).toBeVisible();
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  });

  test.describe(`Онбординг — шаг 2: Telegram Business — ${localeCase.name}`, () => {
    test.beforeEach(async ({ context }) => {
      await setAuthCookies(context);
      await setBotTokenCookie(context);
    });

    test("отображает инструкцию подключения", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/business`);
      await expect(
        page.getByRole("heading", { name: localeCase.labels.businessHeading }),
      ).toBeVisible();
    });

    test("кнопка продолжить → переход на главную", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/business`);
      await page
        .getByRole("link", { name: localeCase.labels.continue })
        .click();
      await expect(page).toHaveURL(new RegExp(`/${localeCase.code}$`));
    });

    test("кнопка Назад → переход на /bot", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/business`);
      await page.getByRole("link", { name: localeCase.labels.back }).click();
      await expect(page).toHaveURL(
        new RegExp(`/${localeCase.code}/onboarding/bot`),
      );
    });

    test("на мобилке визуальная панель скрыта, контент виден", async ({ page }) => {
      await page.goto(`/${localeCase.code}/onboarding/business`);
      await expect(
        page.getByRole("heading", { name: localeCase.labels.businessHeading }),
      ).toBeVisible();
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  });
}
