/**
 * Checks if a value is an object
 * @param val
 */
export const isObject = (val: any): val is object => toString.call(val) === "[object Object]";

export default isObject;
