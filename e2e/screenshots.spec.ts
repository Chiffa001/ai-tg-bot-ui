import * as fs from "fs";
import * as path from "path";
import { test } from "@playwright/test";
import { setAuthCookies, setBotTokenCookie } from "./helpers/auth";
import { localeCases } from "./helpers/locales";

const screenshotsDir = path.join(process.cwd(), "e2e", "screenshots");

test.beforeAll(() => {
  fs.mkdirSync(screenshotsDir, { recursive: true });
});

const screenshot = async (
  page: Parameters<Parameters<typeof test>[2]>[0]["page"],
  locale: string,
  name: string,
) => {
  const project = test.info().project.name;
  const device = project.replace("screenshots-", "");
  const targetDir = path.join(screenshotsDir, locale, device);

  fs.mkdirSync(targetDir, { recursive: true });

  await page.screenshot({
    path: path.join(targetDir, `${name}.png`),
    fullPage: true,
  });
};

for (const localeCase of localeCases) {
  test.describe(`screenshots — ${localeCase.name}`, () => {
    test("лендинг", async ({ page }) => {
      await page.goto(`/${localeCase.code}`);
      await page.waitForLoadState("networkidle");
      await screenshot(page, localeCase.code, "landing");
    });

    test("авторизация — вход", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/login`);
      await page.waitForLoadState("networkidle");
      await screenshot(page, localeCase.code, "auth-login");
    });

    test("авторизация — регистрация", async ({ page }) => {
      await page.goto(`/${localeCase.code}/auth/register`);
      await page.waitForLoadState("networkidle");
      await screenshot(page, localeCase.code, "auth-register");
    });

    test("онбординг — подключение бота", async ({ page, context }) => {
      await setAuthCookies(context);
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await page.waitForLoadState("networkidle");
      await screenshot(page, localeCase.code, "onboarding-bot");
    });

    test("онбординг — бот токен: модальное окно", async ({ page, context }) => {
      await setAuthCookies(context);
      await page.goto(`/${localeCase.code}/onboarding/bot`);
      await page.waitForLoadState("networkidle");
      await page
        .getByRole("button", { name: localeCase.labels.help })
        .click();
      await page.waitForTimeout(300);
      await screenshot(page, localeCase.code, "onboarding-bot-help-modal");
    });

    test("онбординг — Telegram Business", async ({ page, context }) => {
      await setAuthCookies(context);
      await setBotTokenCookie(context);
      await page.goto(`/${localeCase.code}/onboarding/business`);
      await page.waitForLoadState("networkidle");
      await screenshot(page, localeCase.code, "onboarding-business");
    });
  });
}
