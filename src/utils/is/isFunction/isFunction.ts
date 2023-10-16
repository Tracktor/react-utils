/**
 * Returns true if the value is a function
 * @param val
 */
export const isFunction = <T extends Function>(val: unknown): val is T => typeof val === "function";

export default isFunction;
