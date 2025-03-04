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

  useEffect(() => {
    const handleMouseDown = () => {
      setIsHeld(true);
    };
    const handleMouseUp = () => {
      setIsHeld(false);
    };
    const element = ref.current;

    if (element) {
      element.addEventListener("mousedown", handleMouseDown);
      element.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousedown", handleMouseDown);
        element.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, []);

  return { ref, isHeld };
};
