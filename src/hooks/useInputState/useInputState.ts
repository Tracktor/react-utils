import { useCallback, useState } from "react";

/**
 * Hook to handle input state with change event
 * @param initialState
 */
const useInputState = <TYPE, EVENT = unknown>(
  initialState: TYPE,
): [TYPE extends (...args: any) => any ? ReturnType<TYPE> : TYPE, (event: EVENT) => void] => {
  type StateType = TYPE extends (...args: any) => any ? ReturnType<TYPE> : TYPE;
  const [state, setState] = useState<StateType>(initialState as StateType);

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
