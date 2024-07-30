import { describe, expect } from "vitest";
import capitalize from "../capitalize";

describe("capitalize", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("should return an empty string if the input is null", () => {
    expect(capitalize(null)).toBe("");
  });

  it("should return an empty string if the input is undefined", () => {
    expect(capitalize(undefined)).toBe("");
  });

  it("should return an empty string if the input is an empty string", () => {
    expect(capitalize("")).toBe("");
  });
});
