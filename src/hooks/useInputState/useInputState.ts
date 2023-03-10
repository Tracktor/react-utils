import { ChangeEvent, useCallback, useState } from "react";

/**
 * Hook to handle input state with change event
 * @param initialState
 */
const useInputState = <T, EVENT = ChangeEvent<HTMLInputElement>>(initialState: T): [T, (event: EVENT) => void] => {
  const [state, setState] = useState<T>(initialState);

  const setInputState = useCallback((event: EVENT | any) => {
    if ("target" in event && "value" in event.target) {
      setState(event.target.type === "checkbox" ? event.target.checked : event?.target.value);
      return;
    }

    throw new Error("No value found in event");
  }, []);

  return [state, setInputState];
};

export default useInputState;
