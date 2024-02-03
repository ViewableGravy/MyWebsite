import React from "react";

type TOnState<T extends string | null> = T extends null 
  ? { default: React.ReactNode } & { [key: string]: React.ReactNode } 
  : { [K in Exclude<T, null>]: React.ReactNode }

type TConditionalRenderProps<T extends string | null> = {
  state: T,
  onState: TOnState<T>
}

export const Switch = <T extends string | null>({ state, onState }: TConditionalRenderProps<T>) => {
  return <>{onState[state ?? 'default']}</>;
}

type TQuerySwitchProps<T> = {
  queryData: { 
    data: T, 
    isLoading: boolean, 
    isError: boolean 
  } | {
    data: T,
    loading: boolean,
    error: boolean
  },
  children: React.ReactElement | ((data: NonNullable<T>) => React.ReactNode),
  onLoading?: React.ReactElement,
  onError?: React.ReactElement
}

export const QuerySwitch = <T, >({ queryData, children, onError, onLoading }: TQuerySwitchProps<T>) => {
  // useAxios
  if ('loading' in queryData && 'error' in queryData) {
    if (queryData.loading)
      return onLoading ?? null;
    if (queryData.error)
      return onError ?? null;
  } 
  
  //useQuery
  if ('isLoading' in queryData && 'isError' in queryData) {
    if (queryData.isLoading)
      return onLoading ?? null;
    if (queryData.isError)
      return onError ?? null;
  }

  //if for some reason the data is not how we expect
  if (queryData.data === null || queryData.data === undefined) {
    return null;
  }

  if (typeof children === 'function') {
    return children(queryData.data) ?? null;
  } 
  
  return children;
}