import { useEffect, useState } from "react";

export type UseScriptStatus = "idle" | "loading" | "ready" | "error";
export type UseScriptScriptElement = HTMLScriptElement | null;

export interface UseScriptOptions {
  enable?: boolean;
  position?: "head-start" | "head-end" | "body-start" | "body-end";
}

/**
 * This hook loads a script tag into the DOM and returns the status of the script.
 * @param src
 * @param options
 */
const useScript = (src: string, options?: UseScriptOptions): UseScriptStatus => {
  const { enable = true, position = "body-end" } = { ...options };
  const [status, setStatus] = useState<UseScriptStatus>(src ? "loading" : "idle");

  useEffect(
    () => {
      if (!(src && enable)) {
        setStatus("idle");
        return undefined;
      }

      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      let script: UseScriptScriptElement = document.querySelector(`script[src="${src}"]`);

      if (script) {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute("data-status") as UseScriptStatus);
      } else {
        // Create script
        script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.setAttribute("data-status", "loading");

        // Insert script
        if (position === "head-start") {
          document.head.insertBefore(script, document.head.childNodes[0]);
        }
        if (position === "head-end") {
          document.head.appendChild(script);
        }
        if (position === "body-start") {
          document.body.insertBefore(script, document.body.childNodes[0]);
        }
        if (position === "body-end") {
          document.body.appendChild(script);
        }

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event: Event) => {
          script?.setAttribute("data-status", event.type === "load" ? "ready" : "error");
        };

        script.addEventListener("load", setAttributeFromEvent);
        script.addEventListener("error", setAttributeFromEvent);
      }

      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event: Event) => {
        setStatus(event.type === "load" ? "ready" : "error");
      };

      // Add event listeners
      script.addEventListener("load", setStateFromEvent);
      script.addEventListener("error", setStateFromEvent);

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener("load", setStateFromEvent);
          script.removeEventListener("error", setStateFromEvent);
        }
      };
    },
    [enable, position, src], // Only re-run effect if script src changes or enable changes
  );

  return status;
};

export default useScript;
