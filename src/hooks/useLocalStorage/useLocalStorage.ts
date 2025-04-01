import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import useEventCallback from "@/hooks/useEventCallback/useEventCallback";
import useEventListener from "@/hooks/useEventListener/useEventListener";

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

type UseLocalStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
};

type SetValue<T> = Dispatch<SetStateAction<T>>;

const LOCAL_STORAGE_CUSTOM_EVENT = "local-storage";
const IS_SERVER_SIDE = typeof window === "undefined";

const parseJSON = <T>(value: string | null): T | undefined => {
  if (value === "undefined" || value === null) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value as unknown as T;
  }
};

const useLocalStorage = <T>(key: string, initialValue?: T, options?: UseLocalStorageOptions<T>): [T, SetValue<T>, () => void] => {
  const serializer = useCallback<(value: T) => string>(
    (value) => (options?.serializer ? options.serializer(value) : JSON.stringify(value)),
    [options],
  );

  const deserializer = useCallback<(value: string) => T>(
    (value) => (options?.deserializer ? options.deserializer(value) : (parseJSON(value) as T)),
    [options],
  );

  const readValue = useCallback((): T => {
    if (IS_SERVER_SIDE) {
      return initialValue ?? (null as unknown as T);
    }

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? deserializer(raw) : initialValue ?? (null as T);
    } catch {
      return initialValue ?? (null as T);
    }
  }, [key, initialValue, deserializer]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  /**
   * Return a wrapped version of useState's setter function that
   * persists the new value to localStorage.
   */
  const setValue: SetValue<T> = useEventCallback((value) => {
    if (IS_SERVER_SIDE) {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, serializer(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_CUSTOM_EVENT, { detail: key }));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });

  /**
   * Remove value from local storage
   */
  const removeItem = useEventCallback(() => {
    if (IS_SERVER_SIDE) {
      console.warn(`Tried removing localStorage key “${key}” even though environment is not a client`);
    }

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue ?? (null as T));
      window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_CUSTOM_EVENT, { detail: key }));
    } catch (error) {
      console.warn(`Error removing localStorage key “${key}”:`, error);
    }
  });

  /**
   * Read the value from local storage event
   */
  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ("key" in event && event.key !== key) {
        return;
      }

      setStoredValue(readValue());
    },
    [key, readValue],
  );

  /**
   * Set the value in local storage
   */
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEventListener("storage", handleStorageChange);
  useEventListener(LOCAL_STORAGE_CUSTOM_EVENT, handleStorageChange);

  return [storedValue, setValue, removeItem];
};

export default useLocalStorage;
