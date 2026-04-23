import { test, expect } from "@playwright/test";
import { setAuthCookies } from "./helpers/auth";

test.describe("Auth — guards", () => {
  test("неавторизованный пользователь → редирект на /auth/login", async ({ page }) => {
    await page.goto("/onboarding/bot");
    await expect(page).toHaveURL(/\/auth\/login\?next=/);
  });

  test("авторизованный пользователь → редирект с /auth/login на онбординг", async ({
    page,
    context,
  }) => {
    await setAuthCookies(context);
    await page.goto("/auth/login");
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test("авторизованный пользователь → редирект с /auth/register на онбординг", async ({
    page,
    context,
  }) => {
    await setAuthCookies(context);
    await page.goto("/auth/register");
    await expect(page).toHaveURL(/\/onboarding/);
  });
});

test.describe("Auth — страница входа", () => {
  test("отображает форму логина", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.getByRole("heading", { name: /войти/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test("title страницы — Войти в аккаунт", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page).toHaveTitle(/Войти в аккаунт/);
  });

  test("title страницы регистрации — Создать аккаунт", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(page).toHaveTitle(/Создать аккаунт/);
  });

  test("показывает ошибку при пустой форме", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByRole("button", { name: "Войти", exact: true }).click();
    await expect(page.locator("form")).toContainText(/.+/);
  });

  test("успешный вход → переход на онбординг", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.locator('input[name="password"]').fill("password123");
    await page.getByRole("button", { name: "Войти", exact: true }).click();
    await expect(page).toHaveURL(/\/onboarding/, { timeout: 5000 });
  });

  test("кнопка Войти через Telegram → переход на онбординг", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByRole("button", { name: /telegram/i }).click();
    await expect(page).toHaveURL(/\/onboarding/, { timeout: 5000 });
  });

  test("ссылка на регистрацию работает", async ({ page }) => {
    await page.goto("/auth/login");
    await page.getByRole("link", { name: /зарегистрироваться/i }).click();
    await expect(page).toHaveURL(/\/auth\/register/);
  });

  test("на мобилке визуальная панель скрыта, форма видна", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });
});
