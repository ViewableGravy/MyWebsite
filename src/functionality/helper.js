import { useEffect, useState } from "react";

const getWindowDimensions = () => [window.innerWidth, window.innerHeight];

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const ConditionalRenderChildren = ({ children, condition }) => condition ? children : null