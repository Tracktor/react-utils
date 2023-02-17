/**
 * Checks if the given object is a React ref.
 * @param obj
 */
const isRef = (obj: unknown): boolean => obj !== null && typeof obj === "object" && Object.prototype.hasOwnProperty.call(obj, "current");

export default isRef;
