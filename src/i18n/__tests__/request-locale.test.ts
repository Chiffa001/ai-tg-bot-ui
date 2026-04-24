import { describe, expect, it, vi } from "vitest";
import {
  getRequestLocaleFromParams,
  setRequestLocaleFromParams,
} from "@/i18n/request-locale";

const { notFoundMock, setRequestLocaleMock } = vi.hoisted(() => ({
  notFoundMock: vi.fn(() => {
    throw new Error("NOT_FOUND");
  }),
  setRequestLocaleMock: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
  setRequestLocale: setRequestLocaleMock,
}));

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
}));

describe("request locale helpers", () => {
  it("возвращает locale из params", async () => {
    await expect(
      getRequestLocaleFromParams(Promise.resolve({ locale: "pl" })),
    ).resolves.toBe("pl");
  });

  it("вызывает setRequestLocale и возвращает locale", async () => {
    await expect(
      setRequestLocaleFromParams(Promise.resolve({ locale: "en" })),
    ).resolves.toBe("en");

    expect(setRequestLocaleMock).toHaveBeenCalledWith("en");
  });

  it("вызывает notFound для неподдерживаемой locale", async () => {
    await expect(
      getRequestLocaleFromParams(Promise.resolve({ locale: "de" })),
    ).rejects.toThrow("NOT_FOUND");

    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });
});
