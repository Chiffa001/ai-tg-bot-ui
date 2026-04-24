import { beforeEach, describe, expect, it, vi } from "vitest";
import { resolveRequestLocale } from "@/i18n/server-locale";

const { cookiesMock, headersMock } = vi.hoisted(() => ({
  cookiesMock: vi.fn(),
  headersMock: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: cookiesMock,
  headers: headersMock,
}));

type MockHeadersParams = {
  acceptLanguage?: string | null;
};

const createCookieStore = (locale?: string) => ({
  get: (name: string) =>
    name === "NEXT_LOCALE" && locale ? { value: locale } : undefined,
});

const createHeadersStore = ({ acceptLanguage }: MockHeadersParams = {}) => ({
  get: (name: string) =>
    name === "accept-language" ? acceptLanguage ?? null : null,
});

describe("server locale resolver", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookiesMock.mockResolvedValue(createCookieStore());
    headersMock.mockResolvedValue(createHeadersStore());
  });

  it("использует locale из NEXT_LOCALE cookie в приоритете над заголовком", async () => {
    cookiesMock.mockResolvedValue(createCookieStore("pl"));
    headersMock.mockResolvedValue(
      createHeadersStore({ acceptLanguage: "en-US,en;q=0.9,ru;q=0.8" }),
    );

    await expect(resolveRequestLocale()).resolves.toBe("pl");
  });

  it("игнорирует неподдерживаемую locale в cookie и берет accept-language", async () => {
    cookiesMock.mockResolvedValue(createCookieStore("de"));
    headersMock.mockResolvedValue(
      createHeadersStore({ acceptLanguage: "en-US,en;q=0.9,ru;q=0.8" }),
    );

    await expect(resolveRequestLocale()).resolves.toBe("en");
  });

  it("выбирает лучшую поддерживаемую locale из accept-language", async () => {
    headersMock.mockResolvedValue(
      createHeadersStore({ acceptLanguage: "de-DE,de;q=0.9,en;q=0.8,pl;q=0.7" }),
    );

    await expect(resolveRequestLocale()).resolves.toBe("en");
  });

  it("нормализует locale с регионом из accept-language", async () => {
    headersMock.mockResolvedValue(
      createHeadersStore({ acceptLanguage: "pl-PL,pl;q=0.9,en;q=0.8" }),
    );

    await expect(resolveRequestLocale()).resolves.toBe("pl");
  });

  it("использует default locale, если cookie и заголовок не подходят", async () => {
    cookiesMock.mockResolvedValue(createCookieStore("de"));
    headersMock.mockResolvedValue(
      createHeadersStore({ acceptLanguage: "de-DE,de;q=0.9,fr;q=0.8" }),
    );

    await expect(resolveRequestLocale()).resolves.toBe("ru");
  });
});
