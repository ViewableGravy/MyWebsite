import React, { useEffect, useState } from "react";

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

const mediaResolutions = {
  xs: 380,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  'dual-lg': 1884,
  'dual-xl': 2400,
};

export type TMediaKeys = keyof typeof mediaResolutions;

const mapResolutionToMedia = (resolution: number): TMediaKeys => {
  const keys = Object.keys(mediaResolutions) as TMediaKeys[];

  const first = mediaResolutions[keys[0]];
  const last = mediaResolutions[keys[keys.length - 1]];

  if (resolution < first) return keys[0];
  if (resolution > last) return keys[keys.length - 1];

  for (let i = 1; i < keys.length - 1; i++) {
    const key = keys[i];
    const next = keys[i + 1];

    if (resolution < mediaResolutions[next] && resolution > mediaResolutions[key])
      return next;
      
  }

  return keys[0];
};

export const useMedia = () => {
  const [width] = useWindowDimensions();
  const [media, setMedia] = useState(mapResolutionToMedia(width));

  React.useEffect(() => {
    const newMedia = mapResolutionToMedia(width);

    if (newMedia !== media) setMedia(newMedia);
  }, [width]);

  return media;  
}