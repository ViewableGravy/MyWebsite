import useThemedStyles from 'functionality/styler';
import { className } from '../../../src/helpers/runtimeInjectableProps/className';

import React from "react";

type BaseTextProps = {
  className?: string,
  
  'sizeCustom'?: string | number;
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
  'heading'?: boolean;
  'remove-margin'?: boolean;
}

type RTThemedColors = ReturnType<typeof useThemedStyles>['color']
export type TextColorProps = {
  primary?: boolean
} | {
  secondary?: boolean
} | {
  black?: boolean
} | {
  white?: boolean
} | {
  customColor?: keyof RTThemedColors
};

type TInnerHTMLUnion = ({
  children: string | number,
  innerHTML: true;
} | {
  children: React.ReactNode,
  innerHTML?: false | undefined;
})

export type TextProps = BaseTextProps & TextColorProps & TInnerHTMLUnion;

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

export type THeadingProps = Omit<TextProps, 'children' | 'innerHTML'> & { 
  level: 1 | 2 | 3 | 4 | 5, 
  children: React.ReactNode
} & TextColorProps & BaseTextProps;
