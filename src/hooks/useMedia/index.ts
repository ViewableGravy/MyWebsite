import { useStore } from "functionality/state/state";

export const mediaResolutions = {
  xs: "(max-width: 380px)",
  sm: "(min-width: 381px) and (max-width: 576px)",
  md: "(min-width: 577px) and (max-width: 768px)",
  lg: "(min-width: 769px) and (max-width: 992px)",
  xl: "(min-width: 993px) and (max-width: 1200px)",
  'dual-lg': "(min-width: 1201px) and (max-width: 1884px)",
  'dual-xl': "(min-width: 1885px) and (max-width: 2400px)",
};

export type TMediaKey = keyof typeof mediaResolutions;

export const keys = Object.keys(mediaResolutions) as TMediaKey[];

export type TReturnType<T extends TMediaKey[] | undefined = undefined> = T extends undefined ? TMediaKey : boolean

export const useMedia = <T extends TMediaKey[] | undefined = undefined>(match?: T): TReturnType<T> => {
  const [{ media }] = useStore((store) => ({
    media: store.media
  }));

  return (match ? match.includes(media) : media) as TReturnType<T>;
}