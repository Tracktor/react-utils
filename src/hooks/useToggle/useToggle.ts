import { Dispatch, SetStateAction, useCallback, useState } from "react";

/**
 * Use toggle hook
 * @param initialState
 */
const useToggle = (initialState = false): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback((forceBoolean?: boolean) => setState((prevState) => forceBoolean || !prevState), []);

  return [state, toggle, setState];
};

export default useToggle;
