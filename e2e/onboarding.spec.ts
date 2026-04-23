import { test, expect } from "@playwright/test";
import { setAuthCookies, setBotTokenCookie } from "./helpers/auth";

test.describe("Онбординг — guards", () => {
  test("без авторизации → редирект на логин", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test("без куки бота → редирект с /business на /bot", async ({
    page,
    context,
  }) => {
    await setAuthCookies(context);
    await page.goto("/onboarding/business");
    await expect(page).toHaveURL(/\/onboarding\/bot/);
  });

  test("/business доступен при наличии куки бота", async ({
    page,
    context,
  }) => {
    await setAuthCookies(context);
    await setBotTokenCookie(context);
    await page.goto("/onboarding/business");
    await expect(page).toHaveURL(/\/onboarding\/business/);
  });
});

test.describe("Онбординг — шаг 1: подключение бота", () => {
  test.beforeEach(async ({ context }) => {
    await setAuthCookies(context);
  });

  test("отображает форму с полем токена", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await expect(page.getByPlaceholder(/1234567890/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /проверить/i }),
    ).toBeVisible();
  });

  test("кнопка задизейблена при пустом поле", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await expect(
      page.getByRole("button", { name: /проверить/i }),
    ).toBeDisabled();
  });

  test("показывает ошибку для уже подключённого токена", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await page.waitForLoadState("networkidle");
    const submitButton = page.getByRole("button", { name: /проверить/i });
    await page.getByPlaceholder(/1234567890/).fill("1234567890:already1234567890123456789012345678");
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    await expect(page.getByText(/уже подключён/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("успешный токен → переход на /business", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await page.waitForLoadState("networkidle");
    const submitButton = page.getByRole("button", { name: /проверить/i });
    await page.getByPlaceholder(/1234567890/).fill("1234567890:ABCDefGHijKLMnopQRStuvWXYzABCDEFGHIJ");
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    await expect(page).toHaveURL(/\/onboarding\/business/, { timeout: 10000 });
  });

  test("кнопка помощи открывает модальное окно", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await page.getByRole("button", { name: /как получить токен/i }).click();
    await expect(
      page.getByRole("dialog", { name: /как получить токен/i }),
    ).toBeVisible();
  });

  test("модальное окно закрывается по Escape", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await page.getByRole("button", { name: /как получить токен/i }).click();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("dialog", { name: /как получить токен/i }),
    ).not.toBeVisible();
  });

  test("индикатор шагов показывает шаг 1 активным", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await expect(page.getByRole("navigation", { name: /прогресс/i })).toBeVisible();
  });

  test("на мобилке визуальная панель скрыта, форма видна", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await expect(page.getByPlaceholder(/1234567890/)).toBeVisible();
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});

test.describe("Онбординг — шаг 2: Telegram Business", () => {
  test.beforeEach(async ({ context }) => {
    await setAuthCookies(context);
    await setBotTokenCookie(context);
  });

  test("отображает инструкцию подключения", async ({ page }) => {
    await page.goto("/onboarding/business");
    await expect(
      page.getByRole("heading", { name: /telegram business/i }),
    ).toBeVisible();
  });

  test("кнопка продолжить → переход на главную", async ({ page }) => {
    await page.goto("/onboarding/business");
    await page.getByRole("link", { name: /я подключил/i }).click();
    await expect(page).toHaveURL("/");
  });

  test("кнопка Назад → переход на /bot", async ({ page }) => {
    await page.goto("/onboarding/business");
    await page.getByRole("link", { name: /назад/i }).click();
    await expect(page).toHaveURL(/\/onboarding\/bot/);
  });

  test("на мобилке визуальная панель скрыта, контент виден", async ({ page }) => {
    await page.goto("/onboarding/business");
    await expect(
      page.getByRole("heading", { name: /telegram business/i }),
    ).toBeVisible();
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
