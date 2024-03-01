import { useEffect, useRef, useState } from "react";

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
  const isNumberOption = typeof delayOrOptions === "number";
  const onDebounceRef = useRef(isNumberOption ? undefined : delayOrOptions?.onDebounce);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const { delay = 500 } = isNumberOption || !delayOrOptions ? { delay: delayOrOptions } : delayOrOptions;

  // Debounce the value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      onDebounceRef.current?.(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
