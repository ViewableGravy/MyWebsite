import { Value } from "classnames";
import { useState } from "react";

type TReturnType<A extends string, B extends string> = [
    { [keyA in A]: boolean; } & { [KeyB in B]: boolean; }, 
    (state?: A | B) => void
]

type TToggleState = <A extends string, B extends string>([keyA, keyB]: [A, B], initialValue?: string) => TReturnType<A, B>

/**
 * Toggle state lets the consumer switch between two states as a string (rather than just a boolean state). 
 * 
 * A second param can be provided to set the initialValue of the state, otherwise the first key will be the default.
 */
export const useToggleState: TToggleState = ([keyA, keyB], initialValue = keyA) => {
    const [state, setState] = useState(initialValue ?? keyA);

    const toggle = (state?: typeof keyA | typeof keyB) => setState((_state) => {
        if (state) return state;
        if (_state === keyA) return keyB;

        return keyA;
    });

    return [{ [keyA]: state === keyA, [keyB]: state === keyB }, toggle] as any;
}

/**
 * If Condition is true, then this will return a valid key of an objects, 
 * otherwise it will fallback to the Fallback arg which defaults to any
 */
export type ObjectKey<Condition extends boolean, Fallback = any> = Condition extends true ? string | number | Symbol : Fallback;

/**
 * Converts a union to an intersection. Note that this is primarily helpful when creating complex types (T extends X) because
 * a complex type will "iterate" over unions and return the relevant return type for each union.
 * 
 * This means that if you have a union and then return an object for examples ({ [key in T]: boolean }) then the return type will
 * be a union with as many options as the union provided as a generic. Wrapper said function in this will recombine them into a single
 * object. (intersection vs union)
 */
export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends ((x: infer I)=>void) ? I : never
    
export type _ToggleableState<Value, State> = [
  value: Value,
  toggle: (state?: State) => void
]

export type TReturnType2<
  T extends ObjectKey<G> | undefined = undefined,
  G extends boolean = false
> = 
  T extends undefined 
    ? _ToggleableState<boolean, boolean>
    : G extends true 
      ? [
          { [key in NonNullable<T>]: boolean; }, 
          toggle: (state?: T) => void
        ] 
      : _ToggleableState<T, T>
        

export type TToggleState2 = <
  const T extends ObjectKey<G> | undefined = undefined, 
  G extends boolean = false
>(
  states?: T[], 
  options?: {
    initialValue?: NoInfer<T>,
    objectValues?: G
  }
) => G extends true ? UnionToIntersection<TReturnType2<T, true>> : TReturnType2<T, false>

/**
 * The useToggleState2 hook is a more advanced version of the useToggleState hook.
 * This acts more as a useIncrement hook when it is provided with an array of values as it will
 * cycle through the array of values when the second value from the return type is called.
 * 
 * When no value is provided, this acts as a boolean toggle.
 */
export const useToggleState2: TToggleState2 = (states, options) => {
    const { initialValue, objectValues } = {
        initialValue: states?.[0] ?? false,
        objectValues: false,
        ...options
    }
    const _states = states ?? [true, false] as const;

    const [state, setState] = useState(initialValue);

    type TStates = typeof states;
    const toggle = (state?: TStates extends Array<any> ? TStates[number] : boolean) => setState((_state) => {
        if (state && _states.includes(state as any)) return state;

        const index = _states.indexOf(_state as any);
        return _states[index + 1] ?? _states[0];
    });

    if (objectValues) {
        const _state = _states.reduce((acc, _state) => ({ ...acc, [_state as any]: _state === state }), {} as any);

        return [_state, toggle] as any;
    }

    return [state, toggle] as any;
}