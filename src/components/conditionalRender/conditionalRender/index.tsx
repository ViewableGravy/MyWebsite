import React from "react";

type TRenderJSX = React.ReactElement;

type TOnState<T extends string | null> = T extends null 
  ? { default: TRenderJSX } & { [key: string]: TRenderJSX } 
  : { [K in Exclude<T, null>]: TRenderJSX }

type TConditionalRenderProps<T extends string | null> = {
  state: T,
  onState: TOnState<T>
}

export const Switch = <T extends string | null>({ state, onState }: TConditionalRenderProps<T>) => {
  return <>{onState[state ?? 'default']}</>;
}