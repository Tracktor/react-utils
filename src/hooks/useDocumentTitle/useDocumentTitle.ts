import { useCallback } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

/**
 * Use document title
 * @param initialTitle
 */
const useDocumentTitle = (initialTitle: string) => {
  const setTitle = useCallback((title: string): void => {
    window.document.title = title;
  }, []);

  useIsomorphicLayoutEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle, setTitle]);

  return { setTitle, title: window.document.title };
};

export default useDocumentTitle;
