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