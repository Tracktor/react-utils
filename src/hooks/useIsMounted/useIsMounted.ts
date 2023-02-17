import { useCallback, useEffect, useRef } from "react";

/**
 * This hook return boolean of mounted component
 */
function useIsMounted() {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}

export default useIsMounted;
