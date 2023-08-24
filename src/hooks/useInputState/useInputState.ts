import { useCallback, useState } from "react";

/**
 * Hook to handle input state with change event
 * @param initialState
 */
const useInputState = <TYPE, EVENT = unknown>(initialState: TYPE): [TYPE, (event: EVENT) => void] => {
  const [state, setState] = useState<TYPE>(initialState);

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
