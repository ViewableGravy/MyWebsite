import React, { CSSProperties } from "react";
import classNames from "classnames";

import { TDefaults, TextColorProps, TextProps, runtimeInjectableProps } from "./types";
import useThemedStyles from "../../functionality/styler";
import Heading from "./heading";

import './_text.scss';

const reducer = (acc: TDefaults, key: string) => {
  /***** COLOR *****/
  if (key === 'primary') acc.color = 'primary';
  if (key === 'secondary') acc.color = 'secondary';
  if (key === 'black') acc.color = 'black';
  if (key === 'white') acc.color = 'white';

  /***** WEIGHT *****/
  if (key.startsWith('bold')) acc.weight = 'bold';
  if (key.startsWith('italic')) acc.weight = 'italic';
  if (key.startsWith('underline')) acc.weight = 'underline';

  /***** SIZE *****/
  if (key.startsWith('size-')) acc.size = key as Exclude<TDefaults['size'], ''>;
  
  /***** ALIGN *****/
  if (key.startsWith('align-')) acc.align = key as Exclude<TDefaults['align'], ''>;
  
  /***** SPAN *****/
  if (key.startsWith('span')) acc.span = true;
  
  return acc;
};

/**
 * WIP - more robust and easily understandble internal API for getting primary properties
 */
const getPrimaryProperties  = (props: TextProps) => {

  const getColor = (props: TextColorProps) => {
    if ('white' in props && props.white) return 'white';
    if ('black' in props && props.black) return 'black';
    if ('primary' in props && props.primary) return 'primary';
    if ('secondary' in props && props.secondary) return 'secondary';
    if ('customColor' in props && props.customColor) return props.customColor;

    return 'white';
  }

  const getWeight = (props: TextProps) => {
    if ('bold' in props && props.bold) return 'bold';
    if ('italic' in props && props.italic) return 'italic';
    if ('underline' in props && props.underline) return 'underline';

    return '';
  }

  return {
    color: getColor(props),
    weight: getWeight(props)
  }

};

const Text = (props: TextProps): React.ReactElement => {
  const { children, className, innerHTML, sizeCustom } = props
  const { size, align, span } = Object.keys(props).reduce<TDefaults>(reducer, {
    color: 'secondary',
    size: '',
    weight: '',
    align: '',
    span: false
  });
  const { color, weight } = getPrimaryProperties(props);
  const { color: themed } = useThemedStyles();

  /***** RENDER HELPERS *****/
  const _props = {
    children: innerHTML ? undefined : children,
    dangerouslySetInnerHTML: innerHTML ? { __html: children } : undefined,
    className: classNames({
      'Text': true,
      [`Text--${size}`]: !!size,
      [`Text--${weight}`]: !!weight,
      [`Text--${align}`]: !!align,
      [`Text--remove-margin`]: !!props['remove-margin'],
      [themed[color]]: !!themed[color],
    }, className),
    style: { 
      fontSize: typeof sizeCustom === 'number' ? `${sizeCustom}px` : sizeCustom ?? size
    } satisfies CSSProperties
  } as any;

  /***** RENDER *****/
  if (span)
    return <span {..._props} />

  if (['string', 'number'].includes(typeof children) || Array.isArray(children))
    return <p {..._props} />

  return <div {..._props} />
}

Text.Heading = Heading;
Text.runtimeInjectableProps = runtimeInjectableProps;

export default Text;