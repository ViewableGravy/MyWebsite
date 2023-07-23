import classNames from "classnames";
import React from "react";
import './_padding.scss';
import ChildInjector from "../childInjector/childInjector";

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

  return (
    <ChildInjector classes={classes} inject={inject}>
      {children}
    </ChildInjector>
  )

  return <div className={classes}>
    {children}
  </div>
};

export default Padding;