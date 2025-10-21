/**
 * Checks if the given object is a React ref.
 * @param obj
 */
export const isRef = (obj: unknown): boolean => obj !== null && typeof obj === "object" && Object.hasOwn(obj, "current");

export default isRef;
