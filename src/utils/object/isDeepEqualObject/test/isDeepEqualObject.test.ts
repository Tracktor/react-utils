import { describe, expect } from "vitest";
import isDeepEqualObject from "../isDeepEqualObject";

describe("isDeepEqualObject", () => {
  it("should compare primitive values", () => {
    expect(isDeepEqualObject(1, 1)).toBe(true);
    expect(isDeepEqualObject(1, 2)).toBe(false);
    expect(isDeepEqualObject("test", "test")).toBe(true);
    expect(isDeepEqualObject("test", "other")).toBe(false);
    expect(isDeepEqualObject(true, true)).toBe(true);
    expect(isDeepEqualObject(true, false)).toBe(false);
  });

  it("should handle null and undefined values", () => {
    expect(isDeepEqualObject(null, null)).toBe(true);
    expect(isDeepEqualObject(undefined, undefined)).toBe(true);
    expect(isDeepEqualObject(null, undefined)).toBe(false);
    expect(isDeepEqualObject({}, null)).toBe(false);
    expect(isDeepEqualObject(null, {})).toBe(false);
  });

  it("should compare simple objects", () => {
    expect(isDeepEqualObject({}, {})).toBe(true);
    expect(isDeepEqualObject({ a: 1 }, { a: 1 })).toBe(true);
    expect(isDeepEqualObject({ a: 1 }, { a: 2 })).toBe(false);
    expect(isDeepEqualObject({ a: 1 }, { b: 1 })).toBe(false);
    expect(isDeepEqualObject({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });

  it("should compare nested objects", () => {
    const obj1 = {
      a: {
        b: {
          c: 1,
          d: "test",
        },
        e: [1, 2, 3],
      },
    };

    const obj2 = {
      a: {
        b: {
          c: 1,
          d: "test",
        },
        e: [1, 2, 3],
      },
    };

    const obj3 = {
      a: {
        b: {
          c: 1,
          d: "different",
        },
        e: [1, 2, 3],
      },
    };

    expect(isDeepEqualObject(obj1, obj2)).toBe(true);
    expect(isDeepEqualObject(obj1, obj3)).toBe(false);
  });

  it("should compare arrays", () => {
    expect(isDeepEqualObject([], [])).toBe(true);
    expect(isDeepEqualObject([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isDeepEqualObject([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isDeepEqualObject([1, 2], [1, 2, 3])).toBe(false);
  });

  it("should handle objects with nested arrays", () => {
    const obj1 = { a: [1, { b: 2 }] };
    const obj2 = { a: [1, { b: 2 }] };
    const obj3 = { a: [1, { b: 3 }] };

    expect(isDeepEqualObject(obj1, obj2)).toBe(true);
    expect(isDeepEqualObject(obj1, obj3)).toBe(false);
  });

  it("should handle circular references", () => {
    const obj1: any = { a: 1 };
    obj1.self = obj1;

    const obj2: any = { a: 1 };
    obj2.self = obj2;

    expect(() => isDeepEqualObject(obj1, obj2)).toThrow();
  });

  it("should compare objects with dates", () => {
    const date1 = new Date("2024-01-06");
    const date2 = new Date("2024-01-06");
    const date3 = new Date("2024-01-07");

    expect(isDeepEqualObject({ date: date1 }, { date: date2 })).toBe(true);
    expect(isDeepEqualObject({ date: date1 }, { date: date3 })).toBe(false);
  });
});
