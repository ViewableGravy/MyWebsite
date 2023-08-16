import React from 'react';

type MapProps<T, P extends Record<string, unknown> = NonNullable<unknown>> = {
  over: T[];
  apply?: (value: T, index: number) => P;
  children: (props: { value: T, index: number } & P) => React.ReactNode;
};

function Map<T, P extends Record<string, unknown>>({ over, apply, children }: MapProps<T, P>) {
  return (
    <>
      {over.map((value, index) => {
        const props = apply ? apply(value, index) : ({} as P);
        return children({ value, index, ...props });
      })}
    </>
  );
}

export default Map;
