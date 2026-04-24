import { beforeEach, describe, expect, it, vi } from "vitest";
import enMessages from "../../../locales/en.json";
import ruMessages from "../../../locales/ru.json";
import requestConfig from "@/i18n/request";

vi.mock("next-intl/server", () => ({
  getRequestConfig: <T>(factory: T) => factory,
}));

describe("request config", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("загружает сообщения для поддерживаемой locale", async () => {
    const config = await requestConfig({
      requestLocale: Promise.resolve("en"),
    });

    expect(config.locale).toBe("en");
    expect(config.messages).toEqual(enMessages);
  });

  it("использует default locale для неподдерживаемой locale", async () => {
    const config = await requestConfig({
      requestLocale: Promise.resolve("de"),
    });

    expect(config.locale).toBe("ru");
    expect(config.messages).toEqual(ruMessages);
  });

  it("использует default locale, если locale не пришла", async () => {
    const config = await requestConfig({
      requestLocale: Promise.resolve(undefined),
    });

    expect(config.locale).toBe("ru");
    expect(config.messages).toEqual(ruMessages);
  });
});
