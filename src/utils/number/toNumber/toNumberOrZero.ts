/**
 * Convert a value to a number or return 0
 * This function avoid NaN values
 * @param value
 */
const toNumberOrZero = (value: unknown): number => {
  if (typeof value === "boolean") {
    return 0;
  }

  const num = Number(value);
  return Number.isNaN(num) ? 0 : num;
};

export default toNumberOrZero;
