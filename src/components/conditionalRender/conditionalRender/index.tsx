import React from "react";

type TRenderJSX = JSX.Element | JSX.Element[];

type TOnState<T extends string | null> = T extends null 
  ? { default: TRenderJSX } & { [key: string]: TRenderJSX } 
  : { [K in Exclude<T, null>]: TRenderJSX }

type TConditionalRenderProps<T extends string | null> = {
  state: T,
  onState: TOnState<T>
}

export const Switch = <T extends string | null>({ state, onState }: TConditionalRenderProps<T>) => {
  const resultState = onState[state ?? 'default'];

  if (Array.isArray(resultState))
    return resultState as JSX.Element[];

  return <>{resultState}</> as JSX.Element;
}
