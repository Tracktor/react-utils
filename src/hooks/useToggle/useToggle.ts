import { Dispatch, SetStateAction, useCallback, useState } from "react";

/**
 * Use toggle hook to toggle a boolean state
 * @param initialState
 */
const useToggle = (initialState = false): [boolean, (forceBoolean?: boolean) => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(
    (forceBoolean?: boolean) => setState((prevState) => (forceBoolean === undefined ? !prevState : forceBoolean)),
    [],
  );

  return [state, toggle, setState];
};

export default useToggle;
