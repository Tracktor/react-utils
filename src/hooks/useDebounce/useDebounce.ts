import { useEffect, useState } from "react";

/**
 * Debounce hook to prevent excessive calls
 * @param value
 * @param delay
 */
const useDebounce = <T extends any>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
