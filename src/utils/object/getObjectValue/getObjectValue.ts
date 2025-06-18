/* eslint no-redeclare: "off" */

/**
 * Utility function to get a value from an object by key.
 * @param obj
 * @param key
 * @param defaultValue
 */
export function getObjectValue<T>(obj: unknown, key: string, defaultValue: T): T;
export function getObjectValue<T = unknown>(obj: unknown, key: string): T | undefined;
export function getObjectValue<T = unknown>(obj: unknown, key: string, defaultValue?: T): T | undefined {
  if (obj && typeof obj === "object") {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, key);
      const value = descriptor?.value;

      if (value !== undefined && value !== null) {
        return value;
      }

      if (defaultValue !== undefined) {
        return defaultValue;
      }
    }
  }

  return defaultValue;
}

export default getObjectValue;
