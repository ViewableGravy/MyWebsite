import { useMemo } from "react"

type Tokens =
  | "color-primary"
  | "color-secondary"
  | "color-link"
  | "color-link-hover"
  | "border-color"
  | "background-color-primary"
  | "background-color-secondary"
  | "background-color-vibrant"

export const useToken = (props: Record<string, Tokens>) => {
  return useMemo(() => {
    return Object.entries(props).reduce((acc, [key, value]) => {
      if (!value) return;

      return {
        ...acc,
        [key]: `var(--${value})`
      }
    }, {})
  }, Object.values(props))
}