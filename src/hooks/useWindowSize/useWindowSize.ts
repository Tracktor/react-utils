import { useState } from "react";
import useEventListener from "@/hooks/useEventListener/useEventListener";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect";

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Hook that returns the window size
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: 0,
    width: 0,
  });

  const handleSize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useEventListener("resize", handleSize);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []);

  return windowSize;
};

export default useWindowSize;
