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

  test("with capitalize option", () => {
    const initial = getInitials({ firstName: "john", lastName: "doe" }, true);
    expect(initial).toBe("JD");
  });

  test("with capitalize false option", () => {
    const initial = getInitials({ firstName: "john", lastName: "doe" }, false);
    expect(initial).toBe("jd");
  });

  test("with single word full name", () => {
    const initial = getInitials({ fullName: "Loxam" });
    expect(initial).toEqual("L");
  });

  test("with string parameter", () => {
    const initial = getInitials("John Doe");
    expect(initial).toEqual("JD");
  });

  test("with single word string parameter", () => {
    const initial = getInitials("Loxam");
    expect(initial).toEqual("L");
  });

  test("with string parameter and capitalize", () => {
    const initial = getInitials("john doe", true);
    expect(initial).toBe("JD");
  });
});
