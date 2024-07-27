import React, { useState, useEffect } from "react";
import { isEmpty } from "../utilities/sharedFunctions";

export const useNativeClickListener = (element, initialState) => {

  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {

    const globalClickHandler = (event) => {

      if (isEmpty(element.current) === false && !element.current.contains(event.target)) {

        setIsActive(!isActive);

      };

    };

    if (isActive === true) {

      window.addEventListener("click", globalClickHandler);

    };

    return () => {

      window.removeEventListener("click", globalClickHandler);

    };

  }, [isActive, element]);

  return [isActive, setIsActive];

};
