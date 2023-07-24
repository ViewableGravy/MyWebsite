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

  if (resolution < mediaResolutions['xs']) return 'xs';
  if (resolution > mediaResolutions['dual-xl']) return 'dual-xl';
  
  if (resolution > mediaResolutions['xs'] && resolution < mediaResolutions['sm']) return 'sm';
  if (resolution > mediaResolutions['sm'] && resolution < mediaResolutions['md']) return 'md';
  if (resolution > mediaResolutions['md'] && resolution < mediaResolutions['lg']) return 'lg';
  if (resolution > mediaResolutions['lg'] && resolution < mediaResolutions['xl']) return 'xl';
  if (resolution > mediaResolutions['xl']) return 'dual-lg';

  return 'xs';
};

export const useMedia = () => {
  const [width] = useWindowDimensions();
  const [media, setMedia] = useState(mapResolutionToMedia(width));

  React.useEffect(() => {
    const newMedia = mapResolutionToMedia(width);

    console.log(newMedia);

    if (newMedia !== media) setMedia(newMedia);
  }, [width]);

  return media;  
}