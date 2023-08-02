import classNames from "classnames";
import React from "react";
import './_padding.scss';
import ClassInjector, { ClassInjector2 } from "../childInjector/classInjector";
import ChildInjector from "components/childInjector";

type TPaddingProps = {
  children: JSX.Element,
  className?: string,
  inject?: boolean,
  x?: number,
  y?: number,
  xy?: number
}

type TPadding = React.FC<TPaddingProps>

const Padding: TPadding = ({ children, className, inject, x, y, xy }) => {
  const defaultPadding = 5;

  const _y = xy ?? y;
  const _x = xy ?? x;
  
  const style = {
    paddingLeft: _x ? `${_x * defaultPadding}px` : undefined,
    paddingRight: _x ? `${_x * defaultPadding}px` : undefined,
    marginTop: _y ? `${_y * defaultPadding}px` : undefined,
    marginBottom: _y ? `${_y * defaultPadding}px` : undefined
  }

  return (
    <ChildInjector inject={inject} injectableProps={{style, className}}>
      {children}
    </ChildInjector>
  )


  {/* const {x, y} = Object.keys(props).reduce((acc, key) => {
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
  }); */}
  
  {/* return ( <ClassInjector2 inject classes={classes}>{children}</ClassInjector2> )

  return (
    <ClassInjector classes={classes} inject={inject}>
      {children}
    </ClassInjector>
  ) */}
};

export default Padding;