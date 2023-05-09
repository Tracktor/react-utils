import { describe, expect } from "vitest";
import { getInitials } from "../getInitials";

describe("formatCreditCardNumber", () => {
  test("with firstname and lastname", () => {
    const initial = getInitials({ firstName: "John", lastName: "Doe" });
    expect(initial).toBe("JD");
  });

  test("with full name", () => {
    const initial = getInitials({ fullName: "John Doe" });
    expect(initial).toEqual("JD");
  });

  test("with full name with more than 2 name", () => {
    const initial = getInitials({ fullName: "John Doe San" });
    expect(initial).toEqual("JD");
  });

  test("with only first name", () => {
    const initial = getInitials({ firstName: "John" });
    expect(initial).toEqual("J");
  });

  test("with only last name", () => {
    const initial = getInitials({ firstName: "Doe" });
    expect(initial).toEqual("D");
  });
});
