import React from "react";

type children = JSX.Element | JSX.Element[] | string | number | boolean;

type fallback = ({
  originalChildren,
  missedInjections,
  newChildren
}: {
  originalChildren: children,
  missedInjections?: object,
  newChildren?: children
}) => JSX.Element;

type TStyleInjectorProps = {
  children: children;
  inject?: boolean,
  onInject?: (props: any) => object,
  validate?: (props: string[]) => object, //to implement
  fallback?: fallback,
  injectableProps?: { [key: string]: any }
}

type TStyleInjector = (props: TStyleInjectorProps) => JSX.Element;

const wrapFailedInections: fallback = ({ missedInjections, newChildren }) => {
  return <div {...missedInjections}>{newChildren}</div>;
}

const wrapAllInjections = (injectableProps: { [key: string]: string }): fallback => ({ originalChildren }) => {
  return <div {...injectableProps}>{originalChildren}</div>;
}

/**
 * Set of default fallbacks that can be used with custom implementations of the childInjector
 */
export const fallbacks = {
  WrapFailedInjections: wrapFailedInections,
  WrapAllInjections: wrapAllInjections
}

//TODO - Confirm this is functioning correctly and replace original Injector instances with this one
/**
 * By default, if any injections fail, the component will wrap the children in a div with the failed injections. This can be
 * overriden with the fallback prop.
 */
const ChildInjector: TStyleInjector = ({ children, inject, onInject, validate, fallback, injectableProps = {} }) =>  {
  const isString = typeof children === 'string';
  const isBoolean = typeof children === 'boolean';
  const isNumber = typeof children === 'number';

  //if it's a primitive or should not inject, return a div with the classes
  if ( isString || isBoolean || isNumber || !inject  ) {
    return fallback?.({ originalChildren: children }) ?? fallbacks.WrapAllInjections(injectableProps)({ originalChildren: children });
  }

  //if it's an array, map over the children and recursively call this function, injecting the props to each child
  if (Array.isArray(children))
    return <>{React.Children.map(children, (child) => ChildInjector({ children: child, inject, onInject, validate, fallback, injectableProps }))}</>;

  //get the props to inject
  const toInject = onInject ? onInject(children.props) : injectableProps;

  //attempt injection
  const newChildren = React.cloneElement(children, {
    ...children.props,
    ...toInject
  });

  // validate if any props failed and store them in a variable
  const wrapInjection = Object.entries(toInject).reduce((acc, [key, value]) => {
    if (newChildren.props[key] !== value)
      return { ...acc, [key]: value };
    
    return acc;
  }, {});

  //if any props failed, fallback to a div with the failed prop injections
  if (Object.keys(wrapInjection).length > 0) {
    fallback?.({ 
      originalChildren: children, 
      missedInjections: wrapInjection, 
      newChildren 
    }) ?? fallbacks.WrapAllInjections(injectableProps)({ originalChildren: children });
  }

  return newChildren;
};

export default ChildInjector;