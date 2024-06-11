import { RefObject, useEffect } from "react";

export default function useClickOutside(
  elementRef: RefObject<HTMLDivElement>,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        elementRef &&
        elementRef.current &&
        !elementRef.current.contains(event.target as any)
      ) {
        callback();
      }
      return;
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [elementRef, callback]);
}
