import { describe, expect, it } from "vitest";
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

  describe("dot notation - nested access", () => {
    const testObject = {
      config: {
        api: {
          endpoints: {
            auth: "/api/auth",
            users: "/api/users",
          },
        },
      },
      user: {
        metadata: undefined,
        preferences: null,
        profile: {
          personal: {
            address: {
              city: "Paris",
              coordinates: {
                lat: 48.8566,
                lng: 2.3522,
              },
              country: "France",
              street: "123 Main St",
            },
            age: 30,
            name: "John Doe",
          },
          settings: {
            notifications: {
              email: true,
              preferences: {
                marketing: false,
                security: {
                  loginAlerts: true,
                  passwordChanges: true,
                },
                updates: true,
              },
              push: false,
            },
            theme: "dark",
          },
        },
      },
    };

    it("accesses nested properties at different depths", () => {
      // Level 1
      expect(getObjectValue(testObject, "user")).toBeDefined();
      expect(getObjectValue(testObject, "config")).toBeDefined();

      // Level 2
      expect(getObjectValue(testObject, "user.profile")).toBeDefined();
      expect(getObjectValue(testObject, "config.api")).toBeDefined();

      // Level 3
      expect(getObjectValue(testObject, "user.profile.settings")).toBeDefined();
      expect(getObjectValue(testObject, "user.profile.personal")).toBeDefined();
      expect(getObjectValue(testObject, "config.api.endpoints")).toBeDefined();

      // Level 4
      expect(getObjectValue(testObject, "user.profile.settings.theme")).toBe("dark");
      expect(getObjectValue(testObject, "user.profile.personal.name")).toBe("John Doe");
      expect(getObjectValue(testObject, "user.profile.personal.age")).toBe(30);
      expect(getObjectValue(testObject, "config.api.endpoints.users")).toBe("/api/users");

      // Level 5
      expect(getObjectValue(testObject, "user.profile.settings.notifications.email")).toBe(true);
      expect(getObjectValue(testObject, "user.profile.settings.notifications.push")).toBe(false);
      expect(getObjectValue(testObject, "user.profile.personal.address.street")).toBe("123 Main St");
      expect(getObjectValue(testObject, "user.profile.personal.address.city")).toBe("Paris");

      // Level 6
      expect(getObjectValue(testObject, "user.profile.settings.notifications.preferences.marketing")).toBe(false);
      expect(getObjectValue(testObject, "user.profile.settings.notifications.preferences.updates")).toBe(true);
      expect(getObjectValue(testObject, "user.profile.personal.address.coordinates.lat")).toBe(48.8566);
      expect(getObjectValue(testObject, "user.profile.personal.address.coordinates.lng")).toBe(2.3522);

      // Level 7
      expect(getObjectValue(testObject, "user.profile.settings.notifications.preferences.security.loginAlerts")).toBe(true);
      expect(getObjectValue(testObject, "user.profile.settings.notifications.preferences.security.passwordChanges")).toBe(true);
    });

    it("returns undefined for non-existent nested paths", () => {
      expect(getObjectValue(testObject, "user.profile.settings.nonExistent")).toBeUndefined();
      expect(getObjectValue(testObject, "user.profile.settings.theme.color")).toBeUndefined();
      expect(getObjectValue(testObject, "user.nonExistent.property")).toBeUndefined();
      expect(getObjectValue(testObject, "config.api.endpoints.nonExistent")).toBeUndefined();
      expect(getObjectValue(testObject, "user.profile.personal.address.coordinates.elevation")).toBeUndefined();
    });

    it("returns default values for non-existent nested paths", () => {
      expect(getObjectValue(testObject, "user.profile.settings.language", "en")).toBe("en");
      expect(getObjectValue(testObject, "user.profile.personal.phone", "not provided")).toBe("not provided");
      expect(getObjectValue(testObject, "config.api.timeout", 5000)).toBe(5000);
      expect(getObjectValue(testObject, "user.profile.personal.address.zipcode", "75001")).toBe("75001");
    });

    it("handles null and undefined values in nested paths", () => {
      expect(getObjectValue(testObject, "user.preferences")).toBeNull();
      expect(getObjectValue(testObject, "user.preferences", "default")).toBe("default");
      expect(getObjectValue(testObject, "user.preferences.something", "fallback")).toBe("fallback");

      expect(getObjectValue(testObject, "user.metadata")).toBeUndefined();
      expect(getObjectValue(testObject, "user.metadata", "default")).toBe("default");
      expect(getObjectValue(testObject, "user.metadata.something", "fallback")).toBe("fallback");
    });

    it("handles edge cases with dot notation", () => {
      const edgeObject = {
        "": "empty key",
        "key.with.dots": "literal dots",
        normal: {
          "": "nested empty key",
          "key.with.dots": "nested literal dots",
        },
      };

      // Empty string key
      expect(getObjectValue(edgeObject, "")).toBe("empty key");
      expect(getObjectValue(edgeObject, "normal.")).toBe("nested empty key");

      // Keys that contain literal dots (these won't work with dot notation)
      expect(getObjectValue(edgeObject, "key.with.dots")).toBeUndefined();
      expect(getObjectValue(edgeObject, "normal.key.with.dots")).toBeUndefined();
    });

    it("works with arrays using numeric indices", () => {
      const arrayObject = {
        items: [{ name: "first", value: 1 }, { name: "second", nested: { deep: "value" }, value: 2 }, "string item"],
        matrix: [
          [1, 2, 3],
          [4, 5, 6],
        ],
      };

      expect(getObjectValue(arrayObject, "items.0.name")).toBe("first");
      expect(getObjectValue(arrayObject, "items.1.value")).toBe(2);
      expect(getObjectValue(arrayObject, "items.1.nested.deep")).toBe("value");
      expect(getObjectValue(arrayObject, "items.2")).toBe("string item");
      expect(getObjectValue(arrayObject, "matrix.0.1")).toBe(2);
      expect(getObjectValue(arrayObject, "matrix.1.2")).toBe(6);

      // Non-existent array indices
      expect(getObjectValue(arrayObject, "items.5", "default")).toBe("default");
      expect(getObjectValue(arrayObject, "matrix.0.5", "missing")).toBe("missing");
    });
  });
});
