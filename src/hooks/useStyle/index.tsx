/***** BASE IMPORTS *****/
import { CSSProperties, useMemo } from "react"

/***** TYPE DEFINITIONS *****/
type Values = string | number | boolean | undefined | null | {}
type TypeofStrings = "string" | "number" | "boolean" | "undefined" | "object" | "function" | "bigint" | "symbol" | "default"

type TransformerFunction<T> = (acc: CSSProperties, entry: [key: string, value: T]) => CSSProperties
type Transformer<T extends TypeofStrings = TypeofStrings> = {
  [key in T]?: TransformerFunction<T>
}
type UseStyle = <TVariables extends string = "">(
  args: Partial<Record<keyof CSSProperties | NoInfer<TVariables>, Values>>,
  transformer?: Transformer<TypeofStrings>
) => CSSProperties

/***** CONSTS *****/
const defaultTransformer: Required<Transformer<TypeofStrings>> = {
  "string": (acc, [key, value]) => ({ ...acc, [key]: value }),
  "boolean": (acc, [key, value]) => ({ ...acc, [key]: value ? `${1}px` : 0 }),
  "number": (acc, [key, value]) => ({ ...acc, [key]: value }),
  "undefined": (acc) => acc,
  "object": (acc) => acc,
  "function": (acc) => acc,
  "default": (acc) => acc,
  "symbol": (acc) => acc,
  "bigint": (acc) => acc,
}

/***** HOOK START *****/
/**
 * Hook that returns css variables based on the args passed. This function does not expect
 * dynamic objects for parameters, but rather an object with static keys. Calling this hook
 * with dynamic keys will result in the hook being called on every render.
 */
export const _useStyle: UseStyle = (args, transformer) => {
  /***** HOOKS *****/
  const localTransformer = useMemo(() => ({
    ...defaultTransformer,
    ...transformer
  }), Object.values(transformer ?? {}))

  /***** HOOKS *****/
  return useMemo(() => {
    return Object.entries(args).reduce<CSSProperties>((acc, entry) => {
      const [,value] = entry;
      return localTransformer[typeof value](acc, entry as any)
    }, {})
  }, Object.values(args));
}


/***** EXPORTS *****/
export const useStyle = Object.assign(_useStyle, {
  transformers: {
    pixel: {
      "number": (acc, [key, value]) => ({ ...acc, [key]: `${value}px` }),
      "boolean": (acc, [key, value]) => ({ ...acc, [key]: value ? "1px" : 0 })
    } satisfies Transformer
  }
})