/**
 * Checks if a value is an object
 * @param val
 */
export const isObject = (val: unknown): val is object => toString.call(val) === "[object Object]";

export default isObject;
