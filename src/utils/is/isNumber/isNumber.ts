/**
 * Checks if a value is a number
 * @param val
 */
export const isNumber = (val: unknown): val is number => typeof val === "number";

export default isNumber;
