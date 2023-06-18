import React from "react";
import { useWindowDimensions } from "../functionality/helper";

export const BackgroundHoverMoveEffect = ({ children }: { children: any }) => {
  const [width,] = useWindowDimensions();
  const childrenRef = React.useRef<HTMLElement[]>([]);
  const backgroundRef = React.useRef<HTMLDivElement | null>(null);

  const hideBackgroundHightlight = () => { 
    if (!backgroundRef?.current) return;
    backgroundRef.current.style.backgroundColor = 'transparent';
  }

  const showBackgroundHightlight = () => {
    if (!backgroundRef?.current) return;
    backgroundRef.current.style.backgroundColor = 'white';
  }

  const Children = () => React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      ref: (ref: HTMLElement) => childrenRef.current[index] = ref,
      onMouseOver: () => {
        if (width > 576) {
          const ref = childrenRef.current[index];
          const width = ref.offsetWidth;
          const distanceFromTop = ref.offsetTop;
          const height = ref.offsetHeight;

          if (!width || !distanceFromTop || !height || !backgroundRef?.current) return;

          const highlight = backgroundRef.current;
          highlight.style.top = `${distanceFromTop}px`;
          highlight.style.width = `${width}px`;
          highlight.style.height = `${height - 20}px`
          showBackgroundHightlight();
        }
      },
      onMouseLeave: hideBackgroundHightlight
    })
  );

  React.useEffect(hideBackgroundHightlight, [width])

  return (
    <>
      <Children/>
      <div className="background-hover" ref={backgroundRef}/>
    </>
  );
}