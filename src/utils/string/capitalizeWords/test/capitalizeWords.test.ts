import { describe, it, expect } from "vitest";
import capitalizeWords from "../capitalizeWords";

describe("capitalizeWords", () => {
  it("should capitalize all words in a single lowercase word", () => {
    expect(capitalizeWords("hello")).toBe("Hello");
  });

  it("should capitalize all words in a single uppercase word", () => {
    expect(capitalizeWords("HELLO")).toBe("Hello");
  });

  it("should capitalize all words in a sentence with multiple words", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  it("should handle multiple spaces between words", () => {
    expect(capitalizeWords("hello    world")).toBe("Hello    World");
  });

  it("should handle leading and trailing spaces", () => {
    expect(capitalizeWords("  hello world  ")).toBe("  Hello World  ");
  });

  it("should return an empty string if input is an empty string", () => {
    expect(capitalizeWords("")).toBe("");
  });

  it("should return an empty string if input is not a string", () => {
    // @ts-ignore
    expect(capitalizeWords(123)).toBe("");
    expect(capitalizeWords(undefined)).toBe("");
    expect(capitalizeWords(null)).toBe("");
    expect(capitalizeWords({})).toBe("");
    expect(capitalizeWords([])).toBe("");
  });
});
