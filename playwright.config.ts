import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: "**/screenshots.spec.ts",
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
      testIgnore: "**/screenshots.spec.ts",
    },
    {
      name: "screenshots-desktop",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "**/screenshots.spec.ts",
    },
    {
      name: "screenshots-mobile",
      use: { ...devices["Pixel 5"] },
      testMatch: "**/screenshots.spec.ts",
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
});
