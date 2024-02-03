import React, { CSSProperties } from "react";
import classNames from "classnames";

import { TDefaults, TextProps, runtimeInjectableProps } from "./types";
import useThemedStyles from "../../functionality/styler";
import Heading from "./heading";

import './_text.scss';

const defaults = {
  color: 'secondary',
  size: '',
  weight: '',
  align: '',
  span: false
} satisfies TDefaults;

const reducer = (acc: TDefaults, key: string) => {
  if (key === 'primary') acc.color = 'primary';
  if (key === 'secondary') acc.color = 'secondary';
  if (key === 'black') acc.color = 'black';
  if (key === 'white') acc.color = 'white';
  if (key.startsWith('bold')) acc.weight = 'bold';
  if (key.startsWith('italic')) acc.weight = 'italic';
  if (key.startsWith('underline')) acc.weight = 'underline';
  if (key.startsWith('span')) acc.span = true;
  if (key.startsWith('size-')) acc.size = key as Exclude<TDefaults['size'], ''>;
  if (key.startsWith('align-')) acc.align = key as Exclude<TDefaults['align'], ''>;

  return acc;
};

const Text = ({ children, className, innerHTML, sizeCustom, ..._props }: TextProps): React.ReactElement => {
  const { color, size, weight, align, span } = Object.keys(_props).reduce<TDefaults>(reducer, defaults);
  const { color: themed } = useThemedStyles();

  /***** RENDER HELPERS *****/
  const props = {
    children: innerHTML ? undefined : children,
    dangerouslySetInnerHTML: innerHTML ? { __html: children } : undefined,
    className: classNames({
      'Text': true,
      [`Text--${size}`]: !!size,
      [`Text--${weight}`]: !!weight,
      [`Text--${align}`]: !!align,
      [`Text--remove-margin`]: !!_props['remove-margin'],
      [themed[color]]: !!themed[color],
    }, className),
    style: { 
      fontSize: typeof sizeCustom === 'number' ? `${sizeCustom}px` : sizeCustom ?? size
    } satisfies CSSProperties
  } as any;

  /***** RENDER *****/
  if (span)
    return <span {...props} />

  if (['string', 'number'].includes(typeof children) || Array.isArray(children))
    return <p {...props} />

  return <div {...props} />
}

Text.Heading = Heading;
Text.runtimeInjectableProps = runtimeInjectableProps;

export default Text;