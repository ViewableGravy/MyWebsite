import React from "react";

type TConditionalRenderProps = {
  condition: boolean,
  onTrue?: JSX.Element | JSX.Element[] | (() => JSX.Element),
  onFalse?: JSX.Element | JSX.Element[] | (() => JSX.Element) 
}

export const TurneryRender = ({ condition, onTrue, onFalse }: TConditionalRenderProps) => {
  const renderTrue = () => {
    if (typeof onTrue === 'function') {
      return onTrue();
    }

    if (!onTrue) {
      return null;
    }

    return <>{onTrue}</>;
  }

  const renderFalse = () => {
    if (typeof onFalse === 'function') {
      return onFalse();
    }

    if (!onFalse) {
      return null;
    }

    return <>{onFalse}</>;
  }

  return condition ? renderTrue() : renderFalse();
}

