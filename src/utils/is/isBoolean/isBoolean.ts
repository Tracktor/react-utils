/**
 * Checks if a value is a boolean
 * @param val
 */
export const isBoolean = (val: any): val is boolean => typeof val === "boolean";

export default isBoolean;
