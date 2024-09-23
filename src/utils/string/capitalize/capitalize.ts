/**
 * Capitalize string
 * Example: capitalize("hello") -> "Hello"
 * @param string
 */
const capitalize = (string?: unknown): string => {
  if (!string || typeof string !== "string") {
    return "";
  }

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default capitalize;
