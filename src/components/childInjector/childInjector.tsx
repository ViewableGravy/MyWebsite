import React from "react";
import classNames from "classnames";

type TStyleInjectorProps = {
  classes?: string;
  children: JSX.Element | JSX.Element[] | string | number | boolean;
  inject?: boolean
}

type TStyleInjector = React.FC<TStyleInjectorProps>

const ChildInjector: TStyleInjector = ({ classes, children, inject }) =>  {
  const isString = typeof children === 'string' ;
  const isBoolean = typeof children === 'boolean' ;
  const isNumber = typeof children === 'number';

  //if it's a primitive or should not inject, return a div with the classes
  if ( isString || isBoolean || isNumber || !inject  ) {
    return (
      <div className={classes}>
        {children}
      </div>
    )
  }

  //if it's an array, map over the children and recursively call this function, injecting the classes to each child
  if (Array.isArray(children))
    return (
      <>
        {React.Children.map(children, (child) => ChildInjector({ classes, children: child, inject }))}
      </>
    )

  // attempt to add the class to the element
  const test = React.cloneElement(children, {
    className: classNames({
      [children.props.classNames]: !!children.props.classNames,
      [`${classes}`]: !!classes
    })
  });

  //check if the className was added to the element
  if (test.props.className) {
    return test;
  }

  //falback if the className was not added to the element
  return (
    <div className={classes}>
      {children}
    </div>
  )
};

export default ChildInjector;