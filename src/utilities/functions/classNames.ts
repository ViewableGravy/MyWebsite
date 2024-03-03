import classNames from "classnames";

/************************************************************************
 * TRUTHY KEYS START
 ************************************************************************/
type TTruthyKeys<T extends object> = {
  [K in keyof T]: T[K] extends true ? K : T[K] extends true[] ? K : never
}[keyof T];

type TGetTruthyObject<T extends object> = {
  [P in TTruthyKeys<T>]: T[P]
};

type Prepend<T, U extends any[]> = [T, ...U] // TS 4.0 variadic tuples
type Keys<T extends Record<string, any>> = Keys_<T, []>
type Keys_<T extends Record<string, any>, U extends PropertyKey[]> = {
  [P in keyof T]: {} extends Omit<T, P> ? [P] : Prepend<P, Keys_<Omit<T, P>, U>>
}[keyof T]
/************************************************************************
 * TRUTHY KEYS END
 ************************************************************************/

/************************************************************************
 * TUPLIFY UNION START
 ************************************************************************/
// oh boy don't do this
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never

type FirstOf<T> = T extends [infer F, ...any[]] ? F : never;

// TS4.0+
type Push<T extends any[], V> = [...T, V];

// TS4.1+
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>
/************************************************************************
 * TUPLIFY UNION END
 ************************************************************************/

/************************************************************************
 * JOIN START
 ************************************************************************/
type Join<T extends string[], D extends string = ' '> =
    T extends [] ? '' :
    T extends [infer F extends string] ? `${F}` :
    T extends [infer F extends string, ...infer R extends string[]] ? `${F}${D}${Join<R, D>}` :
    string;
/************************************************************************
 * JOIN END
 ************************************************************************/

/************************************************************************
 * CLASSNAMES START
 ************************************************************************/
// @ts-ignore
type ClassNameRecordToString<Arg extends TClassRecord> = FirstOf<TuplifyUnion<Join<Keys<TGetTruthyObject<Arg>>>>>

type ClassNameString<Arg extends string> = Arg;
type TClassRecord = Record<string, boolean>;
type TClassArg = TClassRecord | string;

type ClassNameArgs<Args extends TClassArg[]> = 
  Args extends [] ? '' : 
  Args extends [infer FIRST extends TClassArg] 
    ? FIRST extends string 
      ? FIRST
      : FIRST extends TClassRecord 
        ? ClassNameRecordToString<FIRST> 
        : '' :
  Args extends [infer FIRST extends TClassArg, ...infer REST extends Array<TClassArg>]
    ? FIRST extends TClassRecord 
      // @ts-ignore
      ? `${ClassNameRecordToString<FIRST>} ${ClassNameArgs<REST>}`  
      : FIRST extends string 
        ? `${ClassNameString<FIRST>} ${ClassNameArgs<REST>}` 
        : '' 
    : '';
/************************************************************************
 * CLASSNAMES END
 ************************************************************************/

const classNamesButBetter = <Args extends TClassArg[]>(...args: Args): ClassNameArgs<Args> => classNames(...args) as any;

const test2 = true as boolean;

const test = classNamesButBetter('test1', { 
  'test2': false, 
  'test3': true 
}, 'test4', 'test5', {
  'test6': test2,
  "I'm a fucking genius!": false,
  'test7': true,
})

test
// ^?