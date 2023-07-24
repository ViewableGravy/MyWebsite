import React from "react";

const useConditional = <T,>(condition: boolean, onTrue?: T, onFalse?: T) => {
  /****** types ******/
  type returnType = typeof onTrue extends undefined ? T | null : typeof onFalse extends undefined ? T | null : T;

  /****** state ******/
  const [value, setValue] = React.useState<T | null>(condition ? onTrue ?? null : onFalse ?? null);

  /****** effects ******/
  React.useEffect(() => {
    setValue(condition ? onTrue ?? null : onFalse ?? null);
  }, [condition, onTrue, onFalse]);

  return value as returnType;
};

export default useConditional;