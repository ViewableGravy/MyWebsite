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
export const useToggleState: TUseToggleState = ([keyA, keyB], initialValue) => {
    const [state, setState] = useState(initialValue === keyA);

    const toggle = (state?: typeof keyA | typeof keyB) => setState((_state) => {
        if (state === keyA) return false;
        if (state === keyB) return true;
        return !_state;
    });

    return [{ [keyA]: state, [keyB]: !state }, toggle] as any;
}