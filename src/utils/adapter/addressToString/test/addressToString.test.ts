import { describe, expect } from "vitest";
import { addressToString } from "../addressToString";

describe("formatCreditCardNumber", () => {
  test("with full address", () => {
    const address = addressToString({
      city: "Trans en provence",
      country: "France",
      postalCode: "83720",
      route: "Chemin de cafon 2",
      streetNumber: 82,
    });

    expect(address).toBe("82 Chemin de cafon 2, 83720 Trans en provence, France");
  });

  test("without country", () => {
    const address = addressToString({
      city: "Trans en provence",
      postalCode: "83720",
      route: "Chemin de cafon 2",
      streetNumber: 82,
    });

    expect(address).toBe("82 Chemin de cafon 2, 83720 Trans en provence");
  });

  test("without country & street number", () => {
    const address = addressToString({
      city: "Trans en provence",
      postalCode: "83720",
      route: "Chemin de cafon 2",
    });

    expect(address).toBe("Chemin de cafon 2, 83720 Trans en provence");
  });

  test("without country & street number", () => {
    const address = addressToString({
      city: "Trans en provence",
      country: "France",
    });

    expect(address).toBe("Trans en provence, France");
  });

  test("with postalCode, route & country", () => {
    const address = addressToString({
      country: "France",
      postalCode: "83720",
      route: "Chemin de cafon 2",
    });

    expect(address).toBe("Chemin de cafon 2, 83720, France");
  });

  test("without line 1", () => {
    const address = addressToString({
      city: "Trans en provence",
      country: "France",
      postalCode: "83720",
    });

    expect(address).toBe("83720 Trans en provence, France");
  });

  test("without line 2", () => {
    const address = addressToString({
      country: "France",
      route: "Chemin de cafon 2",
      streetNumber: 82,
    });

    expect(address).toBe("82 Chemin de cafon 2, France");
  });

  test("with undefined address", () => {
    const address = addressToString(undefined);
    expect(address).toBe("");
  });

  test("with city, route and streetNumber but without postalCode", () => {
    const address = addressToString({
      city: "VILLEURBANNE",
      route: "DOC ROLLET",
      streetNumber: "21",
    });

    expect(address).toBe("21 DOC ROLLET, VILLEURBANNE");
  });
});
