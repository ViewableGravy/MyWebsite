import classNames from "classnames";
import React from "react";
import './_padding.scss';

type TPaddingProps = {
  'x-xs': boolean | undefined,
  'x-sm': boolean | undefined,
  'x-md': boolean | undefined,
  'x-lg': boolean | undefined,
  'x-xl': boolean | undefined,
  'x-xxl': boolean | undefined,
  'y-xs': boolean | undefined,
  'y-sm': boolean | undefined,
  'y-md': boolean | undefined,
  'y-lg': boolean | undefined,
  'y-xl': boolean | undefined,
  'y-xxl': boolean | undefined,
  children: React.ReactNode
}

type TPadding = React.FC<TPaddingProps>

const Padding: TPadding = ({ children, ...props }) => {
  const {x, y} = Object.keys(props).reduce((acc, key) => {
    if (key.includes('x-')) {
      acc.x = key;
    } else if (key.includes('y-')) {
      acc.y = key;
    }
    return acc;
  }, {x: '', y: ''});

  if (!x || !y) throw new Error('Padding component requires x and y props');

  return <div className={classNames(`Padding--${x}`, `Padding--${y}`)}>
    {children}
  </div>
};

export default Padding;