/**
 * Checks if a value is a number
 * @param val
 */
export const isNumber = (val: any): val is number => typeof val === "number";

export default isNumber;
