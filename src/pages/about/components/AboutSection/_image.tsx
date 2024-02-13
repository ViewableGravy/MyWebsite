import { useMedia } from "hooks/useMedia";
import { useAboutSectionContext } from ".";
import classNames from "classnames";
import { CSSProperties, useMemo } from "react";
import { bemBuilder } from "helpers/functions/bemBuilder";

type TChildrenOrProps = { src: string , alt: string } | { children: React.ReactNode };
type TImage = React.FC<{ 
    className?: string, 
    offset?: {
      right?: number | false, 
      down?: number | false,
      up?: number | false
      left?: number | false
    } 
} & TChildrenOrProps>;

const useClassIdentifier = <T extends string, G extends string | undefined = undefined>(baseClass: T, manualId?: G) => {
    const id = useMemo(() => Math.random().toString(36).substring(7), []);

    return `${baseClass}--${manualId ?? id}` as `${T}--${G extends undefined ? typeof id : G}`;
}

type KebabCase<T extends string, G extends boolean = true> = G extends false ? '🤷‍♂️' : T extends `${infer U}${infer R}` ? U extends Uppercase<U> ? `-${Lowercase<U>}${KebabCase<R>}` : `${U}${KebabCase<R>}` : ''; 
type IsPascalCase<T extends string> = T extends `${Uppercase<infer U>}${infer R}` ? false : true;
type UnionToIntersection<U> = 
  (U extends any ? (x: U)=>void : never) extends ((x: infer I)=>void) ? I : never


// @ts-ignore
const styleBuilder = <T extends string, C extends CSSProperties>(selector: T, styles: NonNullable<C>): `${T} { ${KebabCase<Exclude<keyof C, number | Symbol>, IsPascalCase<Exclude<keyof C, number | Symbol>>>}: ${C[keyof C]} }` => {
    const kebabCase = (str: string) => str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

    // @ts-ignore
    return `
      ${selector} {
        ${Object.entries(styles).map(([key, value]) => `${kebabCase(key)}: ${value};`).join('\n')}
      }
    `.replaceAll('\s', '');
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

const chainSelectors = <T extends string[], G extends string | undefined = undefined>(selectors: T, prefix?: G): G extends undefined ? Join<T> : Join<Map<T, NonNullable<G>>> => {
  type RType = G extends undefined ? Join<T> : Join<Map<T, NonNullable<G>>>;

  if (prefix === undefined) {
    return selectors.join('') as RType;
  } else {
    return selectors.map((selector) => `${prefix}${selector}`).join('') as RType;
  }
}

export const _Image: TImage = ({ className, offset, ...props }) => {
  const [base, classGen] = bemBuilder('AboutSection__imageContainer');
  const classIdentifier = useClassIdentifier(base);
  const { imageSide } = useAboutSectionContext();
  const isMobile = useMedia(['xs', 'sm']);

  const isLeft = imageSide === 'left';

  const classes = {
    imageContainer: classNames(base, {
      [classGen(undefined, 'mobile')]: isMobile,
      [classGen(undefined, 'right')]: !isLeft,
      [classGen(undefined, 'left')]: isLeft,
      [classIdentifier]: true
    }, className),
    image: 'AboutSection__image'
  }

  const _styles = {
    isMobile: styleBuilder(chainSelectors([classIdentifier, classGen(undefined, 'mobile')] as const, '.'), {
      right: `${20 - (offset?.right || 0) + (offset?.left || 0)}px`,
      top: `${-35 + (offset?.down || 0) - (offset?.up || 0)}px`
    }),
    isRight: (
        `.${classIdentifier}.AboutSection__imageContainer--right {
            margin-top: ${-60 + (offset?.down || 0) - (offset?.up || 0)}px;
            margin-right: ${-20 - (offset?.right || 0) + (offset?.left || 0)}px;
        }`
    ),
    isLeft: (
        `.${classIdentifier}.AboutSection__imageContainer--left {
            margin-top: ${-60 + (offset?.down || 0) - (offset?.up || 0)}px;
            margin-left: ${-20 - (offset?.left || 0) + (offset?.right || 0)}px;
        }`
    )
  } as const;

  const styles = {
    right: (
      <style>
        {_styles.isMobile}
        {!isMobile && _styles.isRight}
      </style>
    ),
    left: (
      <style>
        {_styles.isMobile}
        {!isMobile && _styles.isLeft}
      </style>
    )
  }

  return (
    <div className={classes.imageContainer}>
      {'children' in props ? props.children : <img className={classes.image} {...props} />}

      {styles[imageSide]}
    </div>
  )
}