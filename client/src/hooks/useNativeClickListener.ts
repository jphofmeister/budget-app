import { useState, useEffect, RefObject } from "react";

export type UseNativeClickListener = (
  element: RefObject<HTMLElement | null>,
  initialState: boolean
) => [boolean, (isActive: boolean) => void];

export const useNativeClickListener: UseNativeClickListener = (element, initialState) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const globalClickHandler = (event: Event) => {
      // if (!isEmpty(element.current) && !element.current.contains(event.target)) {
      if (
        element.current &&
        event.target instanceof Node &&
        !element.current.contains(event.target)
      ) {
        setIsActive(!isActive);
      }
    };

    if (isActive) window.addEventListener("click", globalClickHandler);

    return () => {
      window.removeEventListener("click", globalClickHandler);
    };
  }, [isActive, element]);

  return [isActive, setIsActive];
};

export default useNativeClickListener;
