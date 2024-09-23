/**
 * Capitalize words in a given string
 * Example: capitalizeWords("hello world") -> "Hello World"
 * @param words
 */
const capitalizeWords = (words?: unknown): string => {
  if (!words || typeof words !== "string") {
    return "";
  }

  return words
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default capitalizeWords;
