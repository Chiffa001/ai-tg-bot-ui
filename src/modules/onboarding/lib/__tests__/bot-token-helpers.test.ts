import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildBotUsername,
  sleep,
} from "@/modules/onboarding/lib/bot-token-helpers";

describe("bot token helpers", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("строит username бота из последних 4 цифр token id", () => {
    expect(
      buildBotUsername("1234567890:ABCDefghijklmnopqrstuvwxyz123456789"),
    ).toBe("@telebot_7890");
  });

  it("возвращает короткий suffix, если token id короче 4 символов", () => {
    expect(buildBotUsername("12:ABCDefghijklmnopqrstuvwxyz123456789")).toBe(
      "@telebot_12",
    );
  });

  it("ожидает заданное количество миллисекунд", async () => {
    vi.useFakeTimers();

    const promise = sleep(900);
    let resolved = false;

    promise.then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(899);

    expect(resolved).toBe(false);

    await vi.advanceTimersByTimeAsync(1);

    expect(resolved).toBe(true);
  });
});
