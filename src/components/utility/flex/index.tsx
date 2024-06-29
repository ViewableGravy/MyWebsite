/* eslint-disable @typescript-eslint/no-extra-semi */
import classNames from "classnames";
import './_flex.scss';
import type React from "react";
import { useStyle } from "../../../hooks/useStyle";

type TFlexProps = {
  children: React.ReactNode,
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

  'gap'?: boolean | number,
  "row-gap"?: boolean | number,
  "col-gap"?: boolean | number,
}


type TFlex = React.FC<TFlexProps>
type Reduced = {
  justify?: string,
  align?: string,
  direction?: string,
  wrap?: string,
  gap?: number,
  columnGap?: number,
  rowGap?: number,
}
type CSSVariables = '--flex-gap' | '--flex-row-gap' | '--flex-col-gap'

const Flex: TFlex = ({ children, inject, className, ...props }) => {
  const { justify, align, direction, wrap, gap, columnGap, rowGap } = Object.entries(props).reduce<Reduced>((acc, [key, value]) => {
    if (key.includes('justify-'))    acc.justify   = key;
    if (key.includes('align-'))      acc.align     = key;
    if (key.includes('direction-'))  acc.direction = key;
    if (key.includes('wrap-'))       acc.wrap      = key;
    if (key.includes('gap'))         acc.gap       = Number(value);
    if (key.includes('row-gap'))     acc.rowGap    = Number(value);
    if (key.includes('col-gap'))     acc.columnGap = Number(value);

    return acc;
  }, {});

  const style = useStyle<CSSVariables>({
    '--flex-gap': gap,
    '--flex-row-gap': rowGap,
    '--flex-col-gap': columnGap,
  })

  const classes = classNames("Flex", className, {
    [`Flex--${justify}`]: justify, 
    [`Flex--${align}`]: align, 
    [`Flex--${direction}`]: direction, 
    [`Flex--${wrap}`]: wrap, 
    [`Flex--row-gap`]: rowGap, 
    [`Flex--column-gap`]: columnGap,
    [`Flex--gap`]: gap,
  });

  return (
    <div style={style} className={classes}>
      {children}
    </div>
  )
}

export default Flex;
