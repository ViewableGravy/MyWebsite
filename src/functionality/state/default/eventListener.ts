import React from "react";
import { TMediaKey, mediaResolutions } from "hooks/useMedia";
import { useStore } from "../state";

export const useMediaListener = () => {
  const [, dispatch] = useStore(() => null);

  const handleMediaChange = (key : TMediaKey) => (e: MediaQueryListEvent) => {
    if (e.matches)
      dispatch({ media: key })
  };

  React.useEffect(() => {
    //set initial media
    for (const [key, resolution] of Object.entries(mediaResolutions)) {
      if (window.matchMedia(resolution).matches)
        dispatch({ media: key as TMediaKey })
    }

    //add listeners
    for (const [key, resolution] of Object.entries(mediaResolutions)) {
      window
        .matchMedia(resolution)
        .addEventListener('change', handleMediaChange(key as TMediaKey));
    }

    //remove listeners
    return () => {
      for (const [key, resolution] of Object.entries(mediaResolutions)) {
        window
          .matchMedia(resolution)
          .removeEventListener('change', handleMediaChange(key as TMediaKey));
      }
    }
  }, []);
}