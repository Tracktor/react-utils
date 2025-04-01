import { useState, RefObject } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect";

/**
 * Options for the useInView hook
 */
export interface UseInViewOptions {
  /**
   * Percentage of the element that needs to be visible (0-1)
   * @default 0.1
   */
  threshold?: number | number[];

  /**
   * Element that is used as the viewport for checking visibility
   * @default null (browser viewport)
   */
  root?: Element | null;

  /**
   * Margin around the root, in CSS format
   * @default '0px'
   */
  rootMargin?: string;

  /**
   * When true, only trigger once and stop observing after element becomes visible
   * @default false
   */
  triggerOnce?: boolean;
}

/**
 * Custom hook that detects if a referenced element is visible in the viewport
 * @param ref - Reference to the DOM element to observe
 * @param options - Configuration options for the Intersection Observer
 * @returns Boolean indicating if the element is in view
 */
export const useInView = (ref: RefObject<null | Element>, options: UseInViewOptions = {}): boolean => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const { threshold = 0.1, root = null, rootMargin = "0px", triggerOnce = false } = options;

  useIsomorphicLayoutEffect(() => {
    // Return early if SSR or ref not initialized
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const element = ref.current;
    const observerOptions = { root, rootMargin, threshold };

    // Create the observer instance first
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const inView = entry.isIntersecting;

      setIsInView(inView);

      // If in view and set to trigger only once, unobserve
      if (inView && triggerOnce && element) {
        observer.unobserve(element);
      }
    }, observerOptions);

    // Start observing
    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold, root, rootMargin, triggerOnce]);

  return isInView;
};

export default useInView;
