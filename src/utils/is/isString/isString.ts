/**
 * Checks if a value is a string
 * @param val
 */
export const isString = (val: unknown): val is string => typeof val === "string";

export default isString;
