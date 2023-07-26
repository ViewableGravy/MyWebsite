import React from "react";

type TRenderJSX = JSX.Element | JSX.Element[] | (() => JSX.Element);

type TOnState<T extends string | null> = T extends null 
  ? { default: TRenderJSX } & { [key: string]: TRenderJSX } 
  : { [K in Exclude<T, null>]: TRenderJSX }


type TConditionalRenderProps<T extends string | null> = {
  state: T,
  onState: TOnState<T>
}

export const ConditionalRender = <T extends string | null>({ state, onState }: TConditionalRenderProps<T>) => {
  const render = onState[state ?? 'default']

  if (typeof render === 'function') {
    return render();
  }

  return <>{render}</>;

}

