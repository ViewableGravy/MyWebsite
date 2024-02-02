type TConditionalRenderProps = {
  condition: boolean,
  children?: React.ReactNode | (() => JSX.Element),
  onFalse?: React.ReactNode | (() => JSX.Element) 
}

export const ConditionalRender = ({ condition, children, onFalse }: TConditionalRenderProps) => {
  const renderTrue = () => {
    if (typeof children === 'function') {
      return children();
    }

    if (!children) {
      return null;
    }

    return <>{children}</>;
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

