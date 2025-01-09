import { describe, it, expect } from "vitest";
import phoneNumberAdapter from "../phoneNumberAdapter";

describe("phoneNumberAdapter", () => {
  it("formats French phone numbers correctly without prefix", () => {
    expect(phoneNumberAdapter({ phoneNumber: "0123456789" })).toBe("01 23 45 67 89");
    expect(phoneNumberAdapter({ phoneNumber: "33123456789" })).toBe("01 23 45 67 89");
  });

  it("formats French phone numbers correctly with prefix", () => {
    expect(phoneNumberAdapter({ addPrefix: true, phoneNumber: "33123456789" })).toBe("+33 01 23 45 67 89");
  });

  it("formats UK phone numbers correctly without prefix", () => {
    expect(phoneNumberAdapter({ phoneNumber: "441234567890" })).toBe("1234 567 890");
  });

  it("formats UK phone numbers correctly with prefix", () => {
    expect(phoneNumberAdapter({ addPrefix: true, phoneNumber: "441234567890" })).toBe("+44 1234 567 890");
  });

  it("formats German phone numbers correctly without prefix", () => {
    expect(phoneNumberAdapter({ phoneNumber: "4915123456789" })).toBe("0151 234 56789");
  });

  it("formats German phone numbers correctly with prefix", () => {
    expect(phoneNumberAdapter({ addPrefix: true, phoneNumber: "4915123456789" })).toBe("+49 0151 234 56789");
  });

  it("formats Spanish phone numbers correctly without prefix", () => {
    expect(phoneNumberAdapter({ phoneNumber: "349876543210" })).toBe("987 654 321");
  });

  it("formats Spanish phone numbers correctly with prefix", () => {
    expect(phoneNumberAdapter({ addPrefix: true, phoneNumber: "349876543210" })).toBe("+34 987 654 321");
  });

  it("removes non-digit characters from phone numbers", () => {
    expect(phoneNumberAdapter({ phoneNumber: "+33 (0)123-45-67-89" })).toBe("01 23 45 67 89");
  });

  it("handles unsupported country codes gracefully", () => {
    expect(phoneNumberAdapter({ phoneNumber: "991234567890" })).toBe("99 12 34 56 78 90");
  });

  it("handles empty or invalid input gracefully", () => {
    expect(phoneNumberAdapter({ phoneNumber: "" })).toBe("");
    expect(phoneNumberAdapter({ phoneNumber: "abcdef" })).toBe("");
  });

  it("formats US phone numbers correctly without prefix", () => {
    expect(phoneNumberAdapter({ phoneNumber: "1234567890" })).toBe("(123) 456-7890");
  });

  it("formats US phone numbers correctly with prefix", () => {
    expect(phoneNumberAdapter({ addPrefix: true, phoneNumber: "11234567890" })).toBe("+1 (123) 456-7890");
  });

  it("handles mixed inputs with US numbers", () => {
    expect(phoneNumberAdapter({ phoneNumber: "+1-123-456-7890" })).toBe("(123) 456-7890");
  });
});
