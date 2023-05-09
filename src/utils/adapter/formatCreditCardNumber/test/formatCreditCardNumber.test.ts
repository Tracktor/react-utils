import { describe, expect } from "vitest";
import { formatCreditCardNumber } from "../formatCreditCardNumber";

describe("formatCreditCardNumber", () => {
  test("with correct string length", () => {
    const creditCardNumber = formatCreditCardNumber("1234567890123456");
    expect(creditCardNumber).toEqual("1234 5678 9012 3456");
  });

  test("with correct number length", () => {
    const creditCardNumber = formatCreditCardNumber(1234567890123456);
    expect(creditCardNumber).toEqual("1234 5678 9012 3456");
  });

  test("exceeds the max length", () => {
    const creditCardNumber = formatCreditCardNumber("12345678901234561234567890123456");
    expect(creditCardNumber).toEqual("1234 5678 9012 3456");
  });

  test("less than length", () => {
    const creditCardNumber = formatCreditCardNumber("1234");
    expect(creditCardNumber).toEqual("1234");
  });

  test("with length of 5", () => {
    const creditCardNumber = formatCreditCardNumber("12345");
    expect(creditCardNumber).toEqual("1234 5");
  });

  test("with length of 6 with space", () => {
    const creditCardNumber = formatCreditCardNumber("1234 5");
    expect(creditCardNumber).toEqual("1234 5");
  });
});
