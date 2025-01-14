/**
 * Checks if a value is an array
 * @param val
 */
const isArray = <T = any>(val: unknown): val is T[] => Array.isArray(val);

export default isArray;
