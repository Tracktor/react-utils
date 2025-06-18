import { describe, it, expect } from "vitest";
import getObjectValue from "@/utils/object/getObjectValue/getObjectValue";

describe("getObjectValue", () => {
  it("returns the value if the key exists", () => {
    const obj = { a: 1, b: null };
    expect(getObjectValue(obj, "a")).toBe(1);
  });

  it("returns undefined if the key does not exist and no default value", () => {
    const obj = { a: 1 };
    expect(getObjectValue(obj, "b")).toBeUndefined();
  });

  it("returns the default value if the key does not exist", () => {
    const obj = { a: 1 };
    expect(getObjectValue(obj, "b", 42)).toBe(42);
  });

  it("returns the default value if the value is null", () => {
    const obj = { a: null };
    expect(getObjectValue(obj, "a", 99)).toBe(99);
  });

  it("returns the default value if the value is undefined", () => {
    const obj = { a: undefined };
    expect(getObjectValue(obj, "a", "def")).toBe("def");
  });

  it("returns undefined if the object is null", () => {
    expect(getObjectValue(null, "a")).toBeUndefined();
  });

  it("returns the default value if the object is null", () => {
    expect(getObjectValue(null, "a", "x")).toBe("x");
  });

  it("returns undefined if the object is not an object", () => {
    expect(getObjectValue(42, "a")).toBeUndefined();
    expect(getObjectValue("test", "a")).toBeUndefined();
    expect(getObjectValue(true, "a")).toBeUndefined();
  });

  it("works with objects without prototype", () => {
    const obj = Object.create(null);
    obj.a = 123;
    expect(getObjectValue(obj, "a")).toBe(123);
  });

  it("does not return inherited prototype values", () => {
    const proto = { a: 1 };
    const obj = Object.create(proto);
    expect(getObjectValue(obj, "a")).toBeUndefined();
    expect(getObjectValue(obj, "a", 2)).toBe(2);
  });
});
