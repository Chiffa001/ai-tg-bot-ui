import { describe, expect, it } from "vitest";
import {
  getLocaleFromPathname,
  hasLocale,
  localizePathname,
  normalizeInternalPath,
  stripLocaleFromPathname,
} from "@/i18n/routing";

describe("i18n routing", () => {
  it("распознает поддерживаемые локали", () => {
    expect(hasLocale("ru")).toBe(true);
    expect(hasLocale("en")).toBe(true);
    expect(hasLocale("pl")).toBe(true);
    expect(hasLocale("de")).toBe(false);
  });

  it("извлекает locale из pathname", () => {
    expect(getLocaleFromPathname("/ru/onboarding/bot")).toBe("ru");
    expect(getLocaleFromPathname("/en")).toBe("en");
    expect(getLocaleFromPathname("/pricing")).toBeNull();
  });

  it("убирает locale prefix из pathname", () => {
    expect(stripLocaleFromPathname("/ru/onboarding/business")).toBe(
      "/onboarding/business",
    );
    expect(stripLocaleFromPathname("/en")).toBe("/");
    expect(stripLocaleFromPathname("/pricing")).toBe("/pricing");
  });

  it("добавляет locale prefix к внутреннему pathname", () => {
    expect(localizePathname("/", "ru")).toBe("/ru");
    expect(localizePathname("/onboarding/business", "en")).toBe(
      "/en/onboarding/business",
    );
    expect(localizePathname("/pl/auth/login", "ru")).toBe("/ru/auth/login");
  });

  it("нормализует локализованный pathname в internal path", () => {
    expect(normalizeInternalPath("/ru/onboarding/business?foo=bar")).toBe(
      "/onboarding/business?foo=bar",
    );
    expect(normalizeInternalPath("/auth/login?next=%2Fonboarding%2Fbot")).toBe(
      "/auth/login?next=%2Fonboarding%2Fbot",
    );
    expect(normalizeInternalPath("/pl")).toBe("/");
  });

  it("возвращает null для невалидного internal path", () => {
    expect(normalizeInternalPath("auth/login")).toBeNull();
    expect(normalizeInternalPath("//evil.com")).toBeNull();
  });
});
