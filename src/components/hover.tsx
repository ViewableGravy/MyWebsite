import React from "react";
import { TMediaKey, useMedia } from "../hooks/useMedia/index";
import { createUseStyles } from "react-jss";

type HoverProps = {
  children: (props: { 
    onMouseOver: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
  }) => JSX.Element | JSX.Element[];
  onSize?: TMediaKey[];
}

type Hover = React.FC<HoverProps>;

const useStyles = createUseStyles({
  stackContext: {
    isolation: 'isolate',
  },
  backgroundHover: {
    position: 'absolute',
    borderRadius: '20px',
    transition: 'all 0.2s ease-in-out',
    zIndex: -1,
    cursor: 'pointer',
    marginBlock: 5,
    marginLeft: 10
  }
})

/**
 * TODO, take in an offset that will be used to offset the background highlight
 * 
 * Ensure that left/right aligns with the child as it does not currently (if they have different widths)
 */
export const Hover: Hover = ({ children, onSize }) => {
  const isMatchMedia = useMedia(onSize);
  const classes = useStyles();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const expandX = (width: number, offset: number) => ({ width: width + offset, marginLeft: -1 * offset / 2 });
  
  const onMouseLeave = React.useCallback(() => {
    if (!ref.current) 
      return;
    ref.current.style.backgroundColor = 'transparent';
  }, [isMatchMedia]);

  const onMouseOver = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (onSize && !isMatchMedia)
      return onMouseLeave();

    const _width = event.currentTarget.offsetWidth;
    const distanceFromTop = event.currentTarget.offsetTop;
    const height = event.currentTarget.offsetHeight;

    if (!_width || !distanceFromTop || !height || !ref?.current) return;

    const { width, marginLeft } = expandX(_width, 20)

    const highlight = ref.current.style;
    highlight.top = `${distanceFromTop + 4}px`;
    highlight.width = `${width}px`;
    highlight.marginLeft = `${marginLeft}px`;
    highlight.height = `${height - 20}px`
    highlight.backgroundColor = 'white';
  }, [isMatchMedia]);

  return (
    <div className={classes.stackContext}>
      {children({ onMouseOver, onMouseLeave })}
      <div className={classes.backgroundHover} ref={ref}/>
    </div>
  )
}