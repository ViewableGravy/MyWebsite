import { useState } from "react";

type TUseToggleState = <A extends string, B extends string>
    ([keyA, keyB]: [A, B], initialValue?: string) => [
        { [keyA in Utils.NoInfer<A>]: boolean; } & { [KeyB in Utils.NoInfer<B>]: boolean; }, 
        (state?: A | B) => void
    ]

/**
 * Toggle state lets the consumer switch between two states as a string (rather than just a boolean state). 
 * 
 * A second param can be provided to set the initialValue of the state, otherwise the first key will be the default.
 */
export const useToggleState: TUseToggleState = ([keyA, keyB], initialValue = keyA) => {
    const [state, setState] = useState(initialValue ?? keyA);

    const toggle = (state?: typeof keyA | typeof keyB) => setState((_state) => {
        if (state) return state;
        if (_state === keyA) return keyB;

        return keyA;
    });

    return [{ [keyA]: state === keyA, [keyB]: state === keyB }, toggle] as any;
}