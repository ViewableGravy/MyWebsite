import { TMediaKey, keys, mediaResolutions } from "hooks/useMedia";
import React from "react";
import { useStore } from "../state";

export const useMediaListener = () => {
  const [, dispatch] = useStore(() => null);

  const handleMediaChange = (key : TMediaKey) => (e: MediaQueryListEvent) => {
    if (e.matches)
      dispatch({ media: key })
  };

  React.useEffect(() => {
    //set initial media
    keys.forEach(key => {
      if (window.matchMedia(mediaResolutions[key]).matches)
        dispatch({ media: key })
    });

    //add listeners
    keys.forEach(key => {
      window
        .matchMedia(mediaResolutions[key])
        .addEventListener('change', handleMediaChange(key));
    });

    //remove listeners
    return () => {
      keys.forEach(key => {
        window
          .matchMedia(mediaResolutions[key])
          .removeEventListener('change', handleMediaChange(key));
      });
    }
  }, []);
}