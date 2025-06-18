/* eslint no-redeclare: "off" */

// Unique symbol to signal a non-existent path
const PATH_NOT_FOUND = Symbol("path-not-found");

/**
 * Utility function to get a value from an object by key with support for dot notation.
 * @param obj - The object to search in
 * @param key - The key or path (e.g., "car.color.black")
 * @param defaultValue - Default value to return if path is not found
 *
 * @example
 * const obj = { car: { color: { black: "dark" } } };
 * getObjectValue(obj, "car.color.black"); // "dark"
 * getObjectValue(obj, "car.color.red", "not found"); // "not found"
 */
export function getObjectValue<T>(obj: unknown, key: string, defaultValue: T): T;
export function getObjectValue<T = unknown>(obj: unknown, key: string): T | undefined;
export function getObjectValue<T = unknown>(obj: unknown, key: string, defaultValue?: T): T | undefined {
  if (!obj || typeof obj !== "object") {
    return defaultValue;
  }

  const result = key.split(".").reduce((current: unknown, prop: string): unknown => {
    // Early return if a path already invalid or current is not a valid object
    if (
      current === PATH_NOT_FOUND ||
      typeof current !== "object" ||
      current === null ||
      !Object.prototype.hasOwnProperty.call(current, prop)
    ) {
      return PATH_NOT_FOUND;
    }

    // Return the actual value (even if it's null, undefined, etc.)
    return (current as Record<string, unknown>)[prop];
  }, obj);

  // Return defaultValue if a path doesn't exist OR if we have 3 arguments and the result is null/undefined
  if (result === PATH_NOT_FOUND || (arguments.length === 3 && (result === null || result === undefined))) {
    return defaultValue;
  }

  return result as T;
}

export default getObjectValue;
