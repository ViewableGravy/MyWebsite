import { CSSProperties } from "react";

type KebabCase<T extends string, G extends boolean = true> = G extends false ? '🤷‍♂️' : T extends `${infer U}${infer R}` ? U extends Uppercase<U> ? `-${Lowercase<U>}${KebabCase<R>}` : `${U}${KebabCase<R>}` : ''; 
type IsPascalCase<T extends string> = T extends `${Uppercase<infer U>}${infer R}` ? false : true;

// @ts-ignore
export const styleBuilder = <T extends string, C extends CSSProperties>(selector: T, styles: NonNullable<C>): `${T} { ${KebabCase<Exclude<keyof C, number | Symbol>, IsPascalCase<Exclude<keyof C, number | Symbol>>>}: ${C[keyof C]} }` => {
    const kebabCase = (str: string) => str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

    // @ts-ignore
    return `
      ${selector} {
        ${Object.entries(styles).map(([key, value]) => `${kebabCase(key)}: ${value};`).join('\n')}
      }
    `.replaceAll(/\s/g, '');
}

/**
 * Provides a type for joining a string array on an empty delimiter ('')
 */
type Join<T extends string[]> =
    T extends [] ? '' :
    T extends [infer F extends string] ? `${F}` :
    T extends [infer F extends string, ...infer R extends string[]] ? `${F}${Join<R>}` :
    string;

/**
 * Provides a type for mapping a string array to a new string array with a given prefix
 */
type Map<T extends string[], G extends string> = 
  T extends [] ? [] :
  T extends [infer F extends string] ? [`${G}${F}`] :
  T extends [infer F extends string, ...infer R extends string[]] ? [`${G}${F}`, ...Map<R, G>] : 
  string[];

export const chainSelectors = <T extends string[], G extends string | undefined = undefined>(selectors: T, prefix?: G): G extends undefined ? Join<T> : Join<Map<T, NonNullable<G>>> => {
  type RType = G extends undefined ? Join<T> : Join<Map<T, NonNullable<G>>>;

  if (prefix === undefined) {
    return selectors.join('') as RType;
  } else {
    return selectors.map((selector) => `${prefix}${selector}`).join('') as RType;
  }
}

type TStyle = React.FC<{ styles: Record<string, boolean> }>;

export const Style: TStyle = ({ styles }) => {
  return (
    <style>
      {Object.entries(styles).map(([selector, condition]) => condition ? selector : '')}
    </style>
  )
};
