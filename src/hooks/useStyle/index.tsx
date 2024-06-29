/***** BASE IMPORTS *****/
import { CSSProperties, useMemo } from "react"

/***** TYPE DEFINITIONS *****/
type Values = string | number | boolean | undefined | null
type UseStyle = <TVariables extends string = "">(args: Partial<Record<keyof CSSProperties | NoInfer<TVariables>, Values>>) => CSSProperties

/***** HOOK START *****/
export const useStyle: UseStyle = (args) => {
  /***** HOOKS *****/
  return useMemo(() => {
    return Object.entries(args).reduce<CSSProperties>((acc, [key, value]) => {
      switch (typeof value) {
        case "undefined":
          return acc;
        case 'boolean':
          return value ? { ...acc, [key]: value ? 1 : 0 } : acc;
        case 'string':
        default:
            return { ...acc, [key]: value }
      }
    }, {})
  }, Object.values(args));
}