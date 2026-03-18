import { describe, expect, it } from "vitest";
import toNumberOrNull from "./toNumberOrNull";

describe("toNumberOrNull", () => {
  it("devrait retourner un nombre pour les valeurs numériques", () => {
    expect(toNumberOrNull(42)).toBe(42);
    expect(toNumberOrNull("42")).toBe(42);
    expect(toNumberOrNull(0)).toBe(0);
    expect(toNumberOrNull("0")).toBe(0);
    expect(toNumberOrNull(-42)).toBe(-42);
    expect(toNumberOrNull("-42")).toBe(-42);
    expect(toNumberOrNull(3.14)).toBe(3.14);
    expect(toNumberOrNull("3.14")).toBe(3.14);
  });

  it("devrait retourner null pour les valeurs non numériques", () => {
    expect(toNumberOrNull("abc")).toBeNull();
    expect(toNumberOrNull(null)).toBeNull();
    expect(toNumberOrNull(undefined)).toBeNull();
    expect(toNumberOrNull({})).toBeNull();
    expect(toNumberOrNull([])).toBeNull();
    expect(toNumberOrNull(NaN)).toBeNull();
    expect(toNumberOrNull(true)).toBeNull();
    expect(toNumberOrNull(false)).toBeNull();
  });
});
