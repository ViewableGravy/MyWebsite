import { useStore } from "functionality/state/state";
import { useMemo } from "react";

export type TMediaKey = keyof typeof mediaResolutions;
export type TReturnType<S> = 
  S extends undefined 
    ? boolean 
    : S

type Select<S = any> = (isMatch: boolean) => S;
export type Options<S = undefined> = {
  select?: Select<S>;
}

export const mediaResolutions = {
  xs: "(max-width: 380px)",
  sm: "(min-width: 381px) and (max-width: 576px)",
  md: "(min-width: 577px) and (max-width: 768px)",
  lg: "(min-width: 769px) and (max-width: 992px)",
  xl: "(min-width: 993px) and (max-width: 1200px)",
  xxl: "(min-width: 1201px) and (max-width: 1500px)",
  'dual-lg': "(min-width: 1201px) and (max-width: 1884px)",
  'dual-xl': "(min-width: 1885px) and (max-width: 2400px)",
  'dual-xxl': "(min-width: 2401px)"
};

export const useMedia = <T extends TMediaKey[] | TMediaKey | undefined, const S = undefined>(match: T, options?: Options<S>): TReturnType<S> => {
  /***** HOOKS *****/
  const [media] = useStore(({ media }) => media);

  /***** RENDER HELPERS *****/
  const isMatch = useMemo(() => {
    switch (typeof match) {
      case "string":
        return match === media;
      case "object":
        return match.includes(media);
      default:
        return false;
    }
  }, [match, media]);
  
  /***** RENDER *****/
  if (options?.select) {
    return options.select(isMatch) as any;
  } else {
    return isMatch as any;
  }
}