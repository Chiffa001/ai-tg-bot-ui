import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveClientLocale, getServerErrorMessages } from "@/modules/errors/lib/server-error-messages";
import { defaultLocale } from "@/i18n/routing";

const stubDocument = (cookie: string) =>
  vi.stubGlobal("document", { cookie });

const stubNavigator = (languages: string[], language: string) =>
  vi.stubGlobal("navigator", { languages, language });

const disableNavigator = () =>
  vi.stubGlobal("navigator", undefined);

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("resolveClientLocale", () => {
  describe("из pathname", () => {
    it("возвращает locale из pathname в приоритете над остальным", () => {
      stubDocument("NEXT_LOCALE=pl");

      expect(resolveClientLocale("/en/some/path")).toBe("en");
    });

    it.each([
      ["/en/some/path", "en"],
      ["/pl/dashboard", "pl"],
      ["/ru", "ru"],
    ] as const)("pathname %s → %s", (pathname, expected) => {
      expect(resolveClientLocale(pathname)).toBe(expected);
    });

    it("игнорирует неизвестный сегмент и переходит к cookie", () => {
      stubDocument("NEXT_LOCALE=pl");

      expect(resolveClientLocale("/unknown/path")).toBe("pl");
    });

    it("null pathname переходит к cookie", () => {
      stubDocument("NEXT_LOCALE=en");

      expect(resolveClientLocale(null)).toBe("en");
    });
  });

  describe("из cookie", () => {
    it("читает locale из NEXT_LOCALE cookie", () => {
      stubDocument("NEXT_LOCALE=en");

      expect(resolveClientLocale(null)).toBe("en");
    });

    it("игнорирует неподдерживаемую locale в cookie и возвращает default", () => {
      stubDocument("NEXT_LOCALE=de");
      disableNavigator();

      expect(resolveClientLocale(null)).toBe(defaultLocale);
    });

    it("игнорирует другие cookie", () => {
      stubDocument("session=abc; other=xyz");
      disableNavigator();

      expect(resolveClientLocale(null)).toBe(defaultLocale);
    });

    it("работает с пробелами вокруг cookie", () => {
      stubDocument("session=abc; NEXT_LOCALE=pl; other=xyz");

      expect(resolveClientLocale(null)).toBe("pl");
    });
  });

  describe("из navigator", () => {
    it("определяет locale по точному совпадению языка браузера", () => {
      stubNavigator(["pl"], "pl");

      expect(resolveClientLocale(null)).toBe("pl");
    });

    it("нормализует locale с регионом (en-US → en)", () => {
      stubNavigator(["en-US"], "en-US");

      expect(resolveClientLocale(null)).toBe("en");
    });

    it("выбирает первый поддерживаемый из нескольких языков", () => {
      stubNavigator(["de", "pl", "en"], "de");

      expect(resolveClientLocale(null)).toBe("pl");
    });

    it("возвращает default locale если ни один язык браузера не поддерживается", () => {
      stubNavigator(["de", "fr"], "de");

      expect(resolveClientLocale(null)).toBe(defaultLocale);
    });
  });

  describe("fallback", () => {
    it("возвращает defaultLocale если document и navigator не определены", () => {
      disableNavigator();

      expect(resolveClientLocale(null)).toBe(defaultLocale);
    });
  });
});

describe("getServerErrorMessages", () => {
  it.each(["en", "pl", "ru"] as const)("возвращает сообщения для locale %s", (locale) => {
    const messages = getServerErrorMessages(locale);

    expect(messages).toHaveProperty("title");
    expect(messages).toHaveProperty("description");
    expect(messages).toHaveProperty("retry");
    expect(messages).toHaveProperty("backHome");
    expect(typeof messages.title).toBe("string");
  });

  it("возвращает разные сообщения для разных локалей", () => {
    const en = getServerErrorMessages("en");
    const ru = getServerErrorMessages("ru");
    const pl = getServerErrorMessages("pl");

    expect(en.title).not.toBe(ru.title);
    expect(en.title).not.toBe(pl.title);
    expect(ru.title).not.toBe(pl.title);
  });
});
