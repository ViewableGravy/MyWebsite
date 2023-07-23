import React from "react";
import { useWindowDimensions } from "../functionality/helper";
import { createUseStyles } from "react-jss";

type HoverProps = {
  children: (props: { 
    onMouseOver: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
  }) => JSX.Element | JSX.Element[];
}

type Hover = React.FC<HoverProps>;

const styles = {
  stackContext: {
    isolation: 'isolate'
  },
  backgroundHover: {
    position: 'absolute',
    borderRadius: '5px',
    transition: 'all 0.2s ease-in-out',
    zIndex: -1,
    cursor: 'pointer',
    margin: '5px 5px 5px -5px',
    padding: '0 0 0 10px'
  }
}

const useStyle = createUseStyles(styles)

/**
 * TODO, take in an offset that will be used to offset the background highlight
 */
export const Hover: Hover = ({ children }) => {
  const [windowWidth,] = useWindowDimensions();
  const classes = useStyle();
  const ref = React.useRef<HTMLDivElement | null>(null);

  const onMouseOver = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (windowWidth < 576)
      return;

    const width = event.currentTarget.offsetWidth,
          distanceFromTop = event.currentTarget.offsetTop,
          height = event.currentTarget.offsetHeight;

    if (!width || !distanceFromTop || !height || !ref?.current) return;

    const highlight = ref.current;
    highlight.style.top = `${distanceFromTop + 4}px`;
    highlight.style.width = `${width}px`;
    highlight.style.height = `${height - 20}px`
    highlight.style.backgroundColor = 'white';
  }, []);

  const onMouseLeave = React.useCallback(() => {
    if (!ref?.current) return;
    ref.current.style.backgroundColor = 'transparent';
  }, []);

  return (
    <div className={classes.stackContext}>
      {children({ onMouseOver, onMouseLeave })}
      <div className={classes.backgroundHover} ref={ref}/>
    </div>
  )
}