import classNames from "classnames";

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

type Join<T extends string[]> =
    T extends [] ? '' :
    T extends [infer F extends string] ? `${F}` :
    T extends [infer F extends string, ...infer R extends string[]] ? `${F} ${Join<R>}` :
    string;

// @ts-ignore
type ClassNameRecordToString<Arg extends TClassRecord> = Join<Keys<TGetTruthyObject<Arg>>>
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
      ? `${ClassNameRecordToString<FIRST>} ${ClassNameArgs<REST>}`  
      : FIRST extends string 
        ? `${ClassNameString<FIRST>} ${ClassNameArgs<REST>}` 
        : '' 
    : '';

const classNamesButBetter = <Args extends TClassArg[]>(...args: Args): ClassNameArgs<Args> => classNames(...args) as any;

const test = classNamesButBetter('test1', { 
  'test2': false, 
  'test3': true 
}, 'test4', 'test5', {
  'test6': false,
  "I'm a fucking genius!": true,
  'test7': false,
})

test
// ^?