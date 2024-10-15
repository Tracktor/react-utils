import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import useEventCallback from "@/hooks/useEventCallback";
import useEventListener from "@/hooks/useEventListener";

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

const parseJSON = <T>(value: string | null): T | undefined | null => {
  if (value === "undefined" || value === null) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return value as unknown as T;
  }
};

const useLocalStorage = <T>(key: string, defaultValue?: T): [T, SetValue<T>, () => void] => {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === "undefined") {
      return defaultValue ?? (null as T);
    }

    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        return parseJSON(item) as T;
      }

      return defaultValue ?? (null as T);
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return defaultValue ?? (null as T);
    }
  }, [defaultValue, key]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = useEventCallback((value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === "undefined") {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
    }

    try {
      // Allow value to be a function, so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });

  const removeItem = useEventCallback(() => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === "undefined") {
      console.warn(`Tried removing localStorage key “${key}” even though environment is not a client`);
    }

    try {
      // Remove from local storage
      window.localStorage.removeItem(key);

      // Clear state
      setStoredValue(defaultValue ?? (null as T));

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error removing localStorage key “${key}”:`, error);
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue],
  );

  // this only works for other documents, not the current one
  useEventListener("storage", handleStorageChange);

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener("local-storage", handleStorageChange);

  return [storedValue, setValue, removeItem];
};

export default useLocalStorage;
