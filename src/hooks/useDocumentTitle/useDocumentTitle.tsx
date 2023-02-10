import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

/**
 * Use document title
 * @param title
 */
const useDocumentTitle = (title: string): void => {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
};

export default useDocumentTitle;
