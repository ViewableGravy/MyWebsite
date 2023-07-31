import classNames from "classnames";
import React from "react";
import './_padding.scss';
import ClassInjector, { ClassInjector2 } from "../childInjector/classInjector";

type TPaddingProps = {
  'x-xs'?: boolean,
  'x-sm'?: boolean,
  'x-md'?: boolean,
  'x-lg'?: boolean,
  'x-xl'?: boolean,
  'x-xxl'?: boolean,
  'y-xs'?: boolean,
  'y-sm'?: boolean,
  'y-md'?: boolean,
  'y-lg'?: boolean,
  'y-xl'?: boolean,
  'y-xxl'?: boolean,
  children: JSX.Element,
  className?: string,
  inject?: boolean
}

type TPadding = React.FC<TPaddingProps>

const Padding: TPadding = ({ children, className, inject, ...props }) => {
  const {x, y} = Object.keys(props).reduce((acc, key) => {
    if (key.includes('x-')) {
      acc.x = key;
    } else if (key.includes('y-')) {
      acc.y = key;
    }
    return acc;
  }, {x: '', y: ''});

  const classes = classNames({
    'Padding': true,
    [`Padding--${x}`]: !!x,
    [`Padding--${y}`]: !!y,
    [`${className}`]: !!className
  });
  
  return ( <ClassInjector2 inject classes={classes}>{children}</ClassInjector2> )

  return (
    <ClassInjector classes={classes} inject={inject}>
      {children}
    </ClassInjector>
  )

  return <div className={classes}>
    {children}
  </div>
};

export default Padding;