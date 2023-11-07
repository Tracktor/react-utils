import { describe, expect } from "vitest";
import priceAdapter from "@/utils/adapter/priceAdapter";

describe("priceAdapter", () => {
  test("default local price", () => {
    const price = priceAdapter(1000);
    expect(price).toBe("1 000,00 €");
  });

  test("negative price", () => {
    const price = priceAdapter(-1);
    expect(price).toBe("-1,00 €");
  });

  test("other local price", () => {
    const price = priceAdapter(500, { local: "us-US" });
    expect(price).toBe("€500.00");
  });

  test("with no value", () => {
    const price = priceAdapter();
    expect(price).toBe("0 €");
  });
});
