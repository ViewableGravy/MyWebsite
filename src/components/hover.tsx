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

const styles = {
  stackContext: {
    isolation: 'isolate'
  },
  backgroundHover: {
    position: 'absolute',
    borderRadius: '20px',
    transition: 'all 0.2s ease-in-out',
    zIndex: -1,
    cursor: 'pointer',
    margin: '5px 5px 5px -5px',
    padding: '0 0 0 10px'
  }
}

const useStyles = createUseStyles(styles)

/**
 * TODO, take in an offset that will be used to offset the background highlight
 * 
 * Ensure that left/right aligns with the child as it does not currently (if they have different widths)
 */
export const Hover: Hover = ({ children, onSize }) => {
  const isMatchMedia = useMedia(onSize);
  const classes = useStyles();
  const ref = React.useRef<HTMLDivElement | null>(null);
  
  const onMouseLeave = React.useCallback(() => {
    if (!ref.current) 
      return;
    ref.current.style.backgroundColor = 'transparent';
  }, [isMatchMedia]);

  const onMouseOver = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (onSize && !isMatchMedia)
      return onMouseLeave();

    const width = event.currentTarget.offsetWidth,
          distanceFromTop = event.currentTarget.offsetTop,
          height = event.currentTarget.offsetHeight;

    if (!width || !distanceFromTop || !height || !ref?.current) return;

    const highlight = ref.current.style;
    highlight.top = `${distanceFromTop + 4}px`;
    highlight.width = `${width}px`;
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