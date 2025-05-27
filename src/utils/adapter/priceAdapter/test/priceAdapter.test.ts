import { describe, expect } from "vitest";
import priceAdapter from "@/utils/adapter/priceAdapter";

describe("priceAdapter", () => {
  test("default local price", () => {
    const price = priceAdapter(1000);
    expect(price).toBe("1 000 €");
  });

  test("negative price", () => {
    const price = priceAdapter(-1);
    expect(price).toBe("-1 €");
  });

  test("other local price", () => {
    const price = priceAdapter(500, { local: "us-US" });
    expect(price).toBe("€500");
  });

  test("with no value", () => {
    const price = priceAdapter();
    expect(price).toBe("0 €");
  });

  test("with decimal value", () => {
    const price = priceAdapter(1000.5);
    expect(price).toBe("1 000,50 €");
  });

  test("with zero decimal value", () => {
    const price = priceAdapter(1000.0);
    expect(price).toBe("1 000 €");
  });

  test('with "-" value', () => {
    const price = priceAdapter("-");
    expect(price).toBe("-€");
  });
});
