import * as fs from "fs";
import * as path from "path";
import { test } from "@playwright/test";
import { setAuthCookies, setBotTokenCookie } from "./helpers/auth";

const screenshotsDir = path.join(process.cwd(), "e2e", "screenshots");

test.beforeAll(() => {
  fs.mkdirSync(screenshotsDir, { recursive: true });
});

const screenshot = async (
  page: Parameters<Parameters<typeof test>[2]>[0]["page"],
  name: string,
) => {
  const project = test.info().project.name;
  await page.screenshot({
    path: path.join(screenshotsDir, `${project}__${name}.png`),
    fullPage: true,
  });
};

test("лендинг", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await screenshot(page, "landing");
});

test("авторизация — вход", async ({ page }) => {
  await page.goto("/auth/login");
  await page.waitForLoadState("networkidle");
  await screenshot(page, "auth-login");
});

test("авторизация — регистрация", async ({ page }) => {
  await page.goto("/auth/register");
  await page.waitForLoadState("networkidle");
  await screenshot(page, "auth-register");
});

test("онбординг — подключение бота", async ({ page, context }) => {
  await setAuthCookies(context);
  await page.goto("/onboarding/bot");
  await page.waitForLoadState("networkidle");
  await screenshot(page, "onboarding-bot");
});

test("онбординг — бот токен: модальное окно", async ({ page, context }) => {
  await setAuthCookies(context);
  await page.goto("/onboarding/bot");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /как получить токен/i }).click();
  await page.waitForTimeout(300);
  await screenshot(page, "onboarding-bot-help-modal");
});

test("онбординг — Telegram Business", async ({ page, context }) => {
  await setAuthCookies(context);
  await setBotTokenCookie(context);
  await page.goto("/onboarding/business");
  await page.waitForLoadState("networkidle");
  await screenshot(page, "onboarding-business");
});
