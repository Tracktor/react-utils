import { useEffect, useState } from "react";

interface Options {
  delay?: number;
  onDebounce?: (value: any) => void;
}

type Delay = number;

/**
 * Debounce hook to prevent excessive calls
 * @param value
 * @param delayOrOptions
 */
const useDebounce = <T extends any>(value: T, delayOrOptions?: Delay | Options): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const { delay = 500, onDebounce }: Options =
    typeof delayOrOptions === "number" || !delayOrOptions
      ? {
          delay: delayOrOptions,
          onDebounce: undefined,
        }
      : {
          onDebounce: delayOrOptions?.onDebounce,
        };

  // Debounce the value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      onDebounce?.(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, onDebounce]);

  return debouncedValue;
};

export default useDebounce;
