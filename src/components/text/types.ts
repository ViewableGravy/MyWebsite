import { className } from '../../../src/helpers/runtimeInjectableProps/className';

import React from "react";

export type TextProps = {
  children: React.ReactElement | string,
  className?: string,
  // inject?: boolean,
  'primary'?: boolean;
  'secondary'?: boolean;
  'black'?: boolean;
  'white'?: boolean;
  'size-xs'?: boolean;
  'size-sm'?: boolean;
  'size-md'?: boolean;
  'size-lg'?: boolean;
  'size-xl'?: boolean;
  'size-xxl'?: boolean;
  'size-xxxl'?: boolean;
  'bold'?: boolean;
  'italic'?: boolean;
  'underline'?: boolean;
  'align-left'?: boolean;
  'align-center'?: boolean;
  'align-right'?: boolean;
  'span'?: boolean;
  'remove-margin'?: boolean;
};

export const runtimeInjectableProps = {
  className,
}

export type TDefaults = {
  color: 'primary' | 'secondary' | 'black' | 'white';
  size: 'size-xs' | 'size-sm' | 'size-md' | 'size-lg' | 'size-xl' | 'size-xxl' | '';
  weight: 'bold' | 'italic' | 'underline' | '';
  align: 'align-left' | 'align-center' | 'align-right' | '';
  span: boolean;
}

export type THeadingProps = Omit<TextProps, 'children'> & { level: 1 | 2 | 3 | 4 | 5, children: string | number };