import { INJECTOR_ACTIONS } from "helpers/runtimeInjectableProps/actions";
import React from "react";

type children = JSX.Element | JSX.Element[] | string | number | boolean;

type fallback = ({
  originalChildren,
  missedInjections,
  newChildren,
  type
}: {
  originalChildren: children,
  missedInjections?: { [key: string]: unknown },
  newChildren?: children,
  type: 'primitive' | 'React.Element' | 'HTMLDomElement' | 'unknown'
}) => JSX.Element;


type TStyleInjectorProps = {
  children: children;
  inject?: boolean,
  onInject?: (props: unknown) => { [key: string]: unknown },
  validate?: (props: string[]) => object, //to implement
  fallback?: fallback,
  injectableProps?: { [key: string]: unknown }
}

type TStyleInjector = (props: TStyleInjectorProps) => React.ReactElement;

//TODO - create a type system that guarantees children contain the props if inject is provided

const ChildInjector: TStyleInjector = ({ children, inject, onInject, validate, injectableProps = {}, ...props }) =>  {
  const fallback = props.fallback ?? fallbacks.WrapAllInjections(injectableProps);
  const isString = typeof children === 'string';
  const isBoolean = typeof children === 'boolean';
  const isNumber = typeof children === 'number';

  //if it's a primitive or should not inject, return a div with the classes
  if ( isString || isBoolean || isNumber || !inject  )
    return fallback({ originalChildren: children, type: 'primitive' });

  //if it's an array, map over the children and recursively call this function, injecting the props to each child
  if (Array.isArray(children))
    return <>{React.Children.map(children, (child) => ChildInjector({ children: child, inject, onInject, validate, fallback, injectableProps }))}</>;

  //get the props to inject
  const toInject = onInject ? onInject(children.props) : injectableProps;

  // guarantees that the child is a dom element - specific props can be injected
  if (typeof children.type === 'string') {
    const missedInjections = Object.keys(injectableProps).filter((prop) => !htmlValidAttributeList.includes(prop));
    const missedInjectionsObj = missedInjections.reduce((acc, key) => ({ ...acc, [key]: injectableProps[key] }), {});

    if (missedInjections.length > 0) {
      return fallback({ 
        type: 'HTMLDomElement',
        originalChildren: children, 
        missedInjections: missedInjectionsObj, 
        newChildren: children 
      });
    }

    const newChildren = React.cloneElement(children, {
      ...children.props,
      ...toInject
    });

    return newChildren;
  }

  type Falsy = false | 0 | "" | null | undefined
  type runtimeInjectableProps = { [key in keyof typeof INJECTOR_ACTIONS]: unknown } | Falsy;
  //if component guarantees that a prop can be injected using the runtimeInjectableProps helper function, inject it.
  const runtimeInjectableProps = children.type.runtimeInjectableProps as runtimeInjectableProps;
  if (runtimeInjectableProps) {
    const injectable = Object.entries(runtimeInjectableProps).filter(([key]) => {
      return Object.keys(toInject).includes(key);
    })

    const uninjectable = Object.entries(runtimeInjectableProps).filter(([key]) => {
      return !Object.keys(toInject).includes(key);
    })
  }



    // const invalidProps = Object.keys(toInject).filter(key => !acceptableProps.includes(key));
    // const missedInjections = invalidProps.reduce((acc, key) => ({ ...acc, [key]: toInject[key] }), {});

    // if (invalidProps.length > 0) {
    //   return fallback({ 
    //     originalChildren: children, 
    //     missedInjections, 
    //     newChildren: children,
    //     type: 'React.Element'
    //   });
    // }

    // return newChildren;

  const newChildren = React.cloneElement(children, {
    ...children.props,
    ...toInject
  });

  //cannot guarantee that the props were injected, so fallback
  return fallback({
    originalChildren: children,
    newChildren,
    type: 'unknown'
  });
};

const htmlValidAttributeList = [
  'accept',
  'accept-charset',
  'accesskey',
  'action',
  'align',
  'alt',
  'async',
  'autocomplete',
  'autofocus',
  'autoplay',
  'background',
  'bgcolor',
  'border',
  'charset',
  'checked',
  'cite',
  'className',
  'color',
  'cols',
  'colspan',
  'content',
  'contenteditable',
  'controls',
  'coords',
  'data',
  'data-*',
  'datetime',
  'default',
  'defer',
  'dir',
  'dirname',
  'disabled',
  'download',
  'draggable',
  'dropzone',
  'enctype',
  'for',
  'form',
  'formaction',
  'headers',
  'height',
  'hidden',
  'high',
  'href',
  'hreflang',
  'http-equiv',
  'id',
  'ismap',
  'itemprop',
  'keytype',
  'kind',
  'label',
  'lang',
  'language',
  'list',
  'loop',
  'low',
  'manifest',
  'max',
  'maxlength',
  'media',
  'method',
  'min',
  'multiple',
  'name',
  'novalidate',
  'open',
  'optimum',
  'pattern',
  'ping',
  'placeholder',
  'poster',
  'preload',
  'pubdate',
  'radiogroup',
  'readonly',
  'rel',
  'required',
  'reversed',
  'rows',
  'rowspan',
  'sandbox',
  'scope',
  'scoped',
  'seamless',
  'selected',
  'shape',
  'size',
  'sizes',
  'span',
  'spellcheck',
  'src',
  'srcdoc',
  'srclang',
  'srcset',
  'start',
  'step',
  'style',
  'summary',
  'tabindex',
  'target',
  'title',
  'type',
  'usemap',
  'value',
  'width',
  'wrap'
];

const wrapFailedInections: fallback = ({ missedInjections, newChildren }) => {
  return <div {...missedInjections}>{newChildren}</div>;
}

const wrapAllInjections = (injectableProps: { [key: string]: unknown }): fallback => ({ originalChildren }) => {
  return <div {...injectableProps}>{originalChildren}</div>;
}

/**
 * Set of default fallbacks that can be used with custom implementations of the childInjector
 */
export const fallbacks = {
  WrapFailedInjections: wrapFailedInections,
  WrapAllInjections: wrapAllInjections
}

export default ChildInjector;