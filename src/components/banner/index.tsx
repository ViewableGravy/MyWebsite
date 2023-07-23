import React from "react";
import classNames from "classnames";

import './_Banner.scss';
import { ConditionalRender } from "../conditionalRender";

type TBannerProps = {
  children?: JSX.Element | ((props: object) => JSX.Element),
  brightness?: number
  src: string,
  alt: string,
  'align-center'?: boolean,
  'align-top'?: boolean,
  'align-bottom'?: boolean,
}

type TPropReducer = {
  align: 'align-center' | 'align-top' | 'align-bottom' | ''
}

/**
 * Takes an image and displays it as a banner that spans the width of the parent container.
 * It can also take children to be positioned within the image
*/
const Banner = ({ children, src, alt, brightness = 1, ...props }: TBannerProps) => {
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  
  const { align } = Object.keys(props).reduce<TPropReducer>((acc, key) => {
    if (key.includes('align-')) acc.align = key as Exclude<TPropReducer['align'], ''>;

    return acc;
  }, { align: '' });

  const renderOrInvokeChildren = (props: object) => {
    if (typeof children === 'function') {
      return children(props);
    }

    return children;
  }

  //***** STYLES ******//
  const classes = classNames({
    'Banner': true,
    'Banner--has-children': !!children
  });

  const imageClasses = classNames({
    'Banner__image': true,
    [`Banner__image--${align}`]: !!align
  });

  const style = {
    filter: `brightness(${brightness})`
  }

  return (
    <div className={classes}
      onMouseOver={() => { setIsMouseOver(true) }}
      onMouseLeave={() => { setIsMouseOver(false) }}
    >
      <img 
        src={src} 
        alt={alt} 
        style={style} 
        className={imageClasses} 
      />
      <ConditionalRender
        condition={!!children}
        onTrue={
          renderOrInvokeChildren({ isMouseOver })
        }
      />
    </div>
  );
}

Banner.Floating = ({ size = 5, children }: any) => {
  
  return (
    <div style={{ borderRadius: '10px', width: `${size}00px`, aspectRatio: '6 / 1', backgroundColor: 'red' }}>
      {children}
    </div>
  )
};

export default Banner;