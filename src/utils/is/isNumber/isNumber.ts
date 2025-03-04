/**
 * Checks if a value is a number
 * @param val
 */
const isNumber = (val: unknown): val is number => {
  const castValToNumber = Number(val);
  return typeof val === "number" || !Number.isNaN(castValToNumber);
};
export default isNumber;
