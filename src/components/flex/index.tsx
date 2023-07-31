/* eslint-disable @typescript-eslint/no-extra-semi */
import classNames from "classnames";
import React from "react";
import './_flex.scss';
import ClassInjector from "../childInjector/classInjector";

type TFlexProps = {
  children: JSX.Element,
  inject?: boolean,
  className?: string,
  'justify-start'?: boolean,
  'justify-end'?: boolean,
  'justify-center'?: boolean,
  'justify-between'?: boolean,
  'justify-around'?: boolean,
  'justify-evenly'?: boolean,
  'align-start'?: boolean,
  'align-end'?: boolean,
  'align-center'?: boolean,
  'align-baseline'?: boolean,
  'align-stretch'?: boolean,
  'direction-row'?: boolean,
  'direction-row-reverse'?: boolean,
  'direction-col'?: boolean,
  'direction-col-reverse'?: boolean,
  'wrap'?: boolean,
  'wrap-reverse'?: boolean,
  'gap-row-xs'?: boolean,
  'gap-row-sm'?: boolean,
  'gap-row-md'?: boolean,
  'gap-row-lg'?: boolean,
  'gap-row-xl'?: boolean,
  'gap-row-xxl'?: boolean,
  'gap-col-xs'?: boolean,
  'gap-col-sm'?: boolean,
  'gap-col-md'?: boolean,
  'gap-col-lg'?: boolean,
  'gap-col-xl'?: boolean,
  'gap-col-xxl'?: boolean,
  'gap-xs'?: boolean,
  'gap-sm'?: boolean,
  'gap-md'?: boolean,
  'gap-lg'?: boolean,
  'gap-xl'?: boolean,
  'gap-xxl'?: boolean,
}


type TFlex = React.FC<TFlexProps>

const Flex: TFlex = ({ children, inject, className, ...props }) => {
  const {justify, align, direction, wrap, gap} = Object.keys(props).reduce((acc, key) => {
    if (key.includes('justify-'))       acc.justify   = key;
    if (key.includes('align-'))         acc.align     = key;
    if (key.includes('direction-'))     acc.direction = key;
    if (key.includes('wrap-'))          acc.wrap      = key;
    if (key.includes('gap-')) {
      if      (key.includes('gap-row')) acc.gap.col   = key;
      else if (key.includes('gap-col')) acc.gap.row   = key;
      else {
        acc.gap.row = `gap-row-${key.split('-')[1]}`;
        acc.gap.col = `gap-col-${key.split('-')[1]}`;
      }
    };

    return acc;
  }, { justify: '', align: '', direction: '', wrap: '', gap: {row: '', col: ''} });

  const classes = classNames({
    'Flex':                 true,
    [`Flex--${justify}`]:   !!justify, 
    [`Flex--${align}`]:     !!align, 
    [`Flex--${direction}`]: !!direction, 
    [`Flex--${wrap}`]:      !!wrap, 
    [`Flex--${gap.row}`]:   !!gap.row, 
    [`Flex--${gap.col}`]:   !!gap.col,
    [`${className}`]:       !!className
  });

  return (
    <ClassInjector classes={classes} inject={inject}>
      {children}
    </ClassInjector>
  )
}

export default Flex;
