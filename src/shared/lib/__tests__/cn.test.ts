import { describe, it, expect } from "vitest";
import { cn } from "../cn";

describe("cn", () => {
  it("объединяет несколько классов", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("отфильтровывает undefined", () => {
    expect(cn("foo", undefined, "bar")).toBe("foo bar");
  });

  it("отфильтровывает null", () => {
    expect(cn("foo", null, "bar")).toBe("foo bar");
  });

  it("отфильтровывает false", () => {
    expect(cn("foo", false, "bar")).toBe("foo bar");
  });

  it("возвращает пустую строку если все значения falsy", () => {
    expect(cn(undefined, null, false)).toBe("");
  });

  it("возвращает один класс без пробелов", () => {
    expect(cn("foo")).toBe("foo");
  });
});
