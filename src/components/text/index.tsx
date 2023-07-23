import React from "react";
import classNames from "classnames";

import { TDefaults, TextProps } from "./types";
import useThemedStyles from "../../functionality/styler";
import './_text.scss';

import Heading from "./heading";

const Text = ({ children, ...props }: TextProps) => {
  const { color: themed } = useThemedStyles();

  const { color, size, weight, align, span } = Object.keys(props).reduce<TDefaults>((acc, key) => {
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
  }, { color: 'secondary', size: '', weight: '', align: '', span: false });
  const classes = classNames({
    'Text': true,
    [`Text--${size}`]: !!size,
    [`Text--${weight}`]: !!weight,
    [`Text--${align}`]: !!align,
    [`Text--remove-margin`]: !!props['remove-margin'],
    [themed[color]]: !!themed[color],
  });

  if (span)
    return <span className={classes}>{children}</span>

  if (['string', 'number'].includes(typeof children) || Array.isArray(children))
    return <p className={classes}>{children}</p>

  return <div className={classes}>{children}</div>
}

Text.Heading = Heading;

export default Text;