import { hasTouch } from "@/utils/touch";
import { useEffect, useRef, useState } from "react";

/**
 * @description This hook is used to detect a mouse hold event on a given element.
 * @param callback - The callback function to be called when the mouse hold event is detected.
 * @param delay - The delay in milliseconds before the callback function is called.
 * @returns A ref to the element that can be used to attach the mouse hold event listener.
 */
export const useMouseHold = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHeld, setIsHeld] = useState(false);

  const mouseUpEventName = hasTouch() ? "touchend" : "mouseup";
  const mouseDownEventName = hasTouch() ? "touchstart" : "mousedown";

  useEffect(() => {
    const handleMouseDown = () => {
      setIsHeld(true);
    };
    const handleMouseUp = () => {
      setIsHeld(false);
    };
    const element = ref.current;

    if (element) {
      element.addEventListener(mouseDownEventName, handleMouseDown);
      element.addEventListener(mouseUpEventName, handleMouseUp);
    }

    return () => {
      if (element) {
        element.removeEventListener(mouseDownEventName, handleMouseDown);
        element.removeEventListener(mouseUpEventName, handleMouseUp);
      }
    };
  }, []);

  return { ref, isHeld };
};
