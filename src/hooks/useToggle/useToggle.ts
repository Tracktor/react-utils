import { useCallback, useState } from "react";

/**
 * Use toggle hook to toggle a boolean state
 * @param initialState
 */
const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback((forceBoolean?: boolean) => setState((prevState) => forceBoolean || !prevState), []);

  return [state, toggle, setState];
};

export default useToggle;
