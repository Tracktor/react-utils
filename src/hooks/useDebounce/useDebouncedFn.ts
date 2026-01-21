import { useCallback, useEffect, useRef } from "react";

/**
 * Creates a debounced version of a callback function that delays invoking the function
 * until after the specified delay has elapsed since the last time it was invoked.
 *
 * This hook is useful for optimizing performance by limiting the rate at which a function
 * can fire, particularly useful for:
 * - Search input handlers
 * - Auto-save functionality
 * - API calls triggered by user input
 * - Window resize/scroll handlers
 *
 * @example
 * const debouncedSearch = useDebouncedCallback((query: string) => {
 *   fetchSearchResults(query);
 * }, 500);
 *
 * // Will only execute after user stops typing for 500ms
 * debouncedSearch(inputValue);
 */
const useDebouncedFn = <T extends (...args: never[]) => unknown>(callback: T, delay = 300): ((...args: Parameters<T>) => void) => {
  // Store the latest callback to avoid stale closures
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  // Store the timeout ID for cleanup
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Create the debounced function (only recreates if delay changes)
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Clear any existing timeout
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to execute the callback after the delay
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );

  // Cleanup: clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

export default useDebouncedFn;
