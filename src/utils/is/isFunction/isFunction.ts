/**
 * Returns true if the value is a function
 * @param val
 */
const isFunction = <T extends Function>(val: any): val is T => typeof val === "function";

export default isFunction;
