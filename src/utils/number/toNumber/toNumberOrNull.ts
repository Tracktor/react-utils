/**
 * Convert a value to a number or return null
 * This function avoid NaN values
 * @param value
 */
const toNumberOrNull = (value: unknown): number | null => {
  if (value === null || value === undefined || typeof value === "boolean" || typeof value === "object") {
    return null;
  }

  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

export default toNumberOrNull;
