import { useStore } from "../state/state";


export type Tokens = "color_primary" | "color_secondary" | "color_tertiary" | "background_color_primary"
type Styles<TKeys extends string> = Record<TKeys, Record<Tokens, string>>

export const styles = {
  light: {
    "color_primary": "#007bff",
    "color_secondary": "#6c757d",
    "color_tertiary": "#f5f5f5",
    "background_color_primary": "#f5f5f5",
  },
  dark: {
    "color_primary": "#a67ee6",
    "color_secondary": "#dadffd",
    "color_tertiary": "#8172bf",
    "background_color_primary": "#191731"
  }
} as const satisfies Styles<"light" | "dark">

type Selector<TResult> = (data: typeof styles["light"] | typeof styles["dark"]) => TResult;
type UseThemedStyles = <TResult = undefined>(selector?: Selector<TResult>) => TResult extends undefined ? typeof styles['dark'] : TResult;

export const useThemedStyles: UseThemedStyles = (selector) => {
  const [theme] = useStore(({ theme }) => theme)

  return selector?.(styles[theme]) ?? styles[theme] as any;
};
