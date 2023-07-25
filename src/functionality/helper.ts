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

// const mediaResolutions = {
//   xs: 380,
//   sm: 576,
//   md: 768,
//   lg: 992,
//   xl: 1200,
//   'dual-lg': 1884,
//   'dual-xl': 2400,
// };



// const mapResolutionToMedia = (resolution: number): TMediaKeys => {

//   if (resolution < mediaResolutions['xs']) return 'xs';
//   if (resolution > mediaResolutions['dual-xl']) return 'dual-xl';

//   if (resolution > mediaResolutions['xs'] && resolution < mediaResolutions['sm']) return 'sm';
//   if (resolution > mediaResolutions['sm'] && resolution < mediaResolutions['md']) return 'md';
//   if (resolution > mediaResolutions['md'] && resolution < mediaResolutions['lg']) return 'lg';
//   if (resolution > mediaResolutions['lg'] && resolution < mediaResolutions['xl']) return 'xl';
//   if (resolution > mediaResolutions['xl']) return 'dual-lg';

//   return 'xs';
// };

// export const useMedia = () => {
//   const [width] = useWindowDimensions();
//   const [media, setMedia] = useState(mapResolutionToMedia(width));

//   React.useEffect(() => {
//     const newMedia = mapResolutionToMedia(width);

//     if (newMedia !== media) setMedia(newMedia);
//   }, [width]);

//   return media;  
// }

// const mediaResolutions = {
//   xs: "(max-width: 380px)",
//   sm: "(min-width: 381px) and (max-width: 576px)",
//   md: "(min-width: 577px) and (max-width: 768px)",
//   lg: "(min-width: 769px) and (max-width: 992px)",
//   xl: "(min-width: 993px) and (max-width: 1200px)",
//   'dual-lg': "(min-width: 1201px) and (max-width: 1884px)",
//   'dual-xl': "(min-width: 1885px) and (max-width: 2400px)",
// };

// export type TMediaKey = keyof typeof mediaResolutions;

// const keys = Object.keys(mediaResolutions) as TMediaKey[];

// export const useMedia = () => {
//   const [media, setMedia] = useState<TMediaKey>('xs');

//   const handleMediaChange = (key : TMediaKey) => (e: MediaQueryListEvent) => {
//     if (e.matches) {

//       setMedia(key);
//     }
//   };

//   useEffect(() => {
//     keys.forEach(key => {
//       window
//         .matchMedia(mediaResolutions[key])
//         .addEventListener('change', handleMediaChange(key));
//     });

//     return () => {
//       keys.forEach(key => {
//         window
//           .matchMedia(mediaResolutions[key])
//           .removeEventListener('change', handleMediaChange(key));
//       });
//     }
//   }, []);

//   return media;
// }