import { describe, expect, it } from "vitest";
import toNumberOrZero from "./toNumberOrZero";

describe("toNumberOrZero", () => {
  it("devrait retourner un nombre pour les valeurs numériques", () => {
    expect(toNumberOrZero(42)).toBe(42);
    expect(toNumberOrZero("42")).toBe(42);
    expect(toNumberOrZero(0)).toBe(0);
    expect(toNumberOrZero("0")).toBe(0);
    expect(toNumberOrZero(-42)).toBe(-42);
    expect(toNumberOrZero("-42")).toBe(-42);
    expect(toNumberOrZero(3.14)).toBe(3.14);
    expect(toNumberOrZero("3.14")).toBe(3.14);
  });

  it("devrait retourner 0 pour les valeurs non numériques", () => {
    expect(toNumberOrZero("abc")).toBe(0);
    expect(toNumberOrZero(null)).toBe(0);
    expect(toNumberOrZero(undefined)).toBe(0);
    expect(toNumberOrZero({})).toBe(0);
    expect(toNumberOrZero([])).toBe(0);
    expect(toNumberOrZero(NaN)).toBe(0);
    expect(toNumberOrZero(true)).toBe(0);
    expect(toNumberOrZero(false)).toBe(0);
  });
});
