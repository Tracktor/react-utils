import { ChangeEvent, useCallback, useState } from "react";

/**
 * Hook to handle input state with change event
 * @param initialState
 */
const useInputState = <T, E = HTMLInputElement>(initialState: T): [T, (event: ChangeEvent<E | any>) => void] => {
  const [state, setState] = useState<T>(initialState);

  const setInputState = useCallback((event: ChangeEvent<E | any>) => {
    if (event?.target?.value) {
      return setState(event?.target?.value);
    }

    throw new Error("No value found in event.target.value");
  }, []);

  return [state, setInputState];
};

export default useInputState;
