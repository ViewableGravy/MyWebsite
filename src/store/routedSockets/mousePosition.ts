/***** IMPORTS *****/
import { type Getter, type Setter, atom } from "jotai/vanilla";
import { NBaseSocket } from ".";

/***** TYPE DEFINTIONS *****/
export namespace NMousePosition {
    export type TSingleBase = {
        x: number,
        y: number,
        username: string,
        route: string,
    }

    export type Event = 'mousePosition';

    export type Base = {
        event: Event, 
        data: Array<TSingleBase>
    }

    export interface TSend extends NBaseSocket.TBaseSend {
        event: Event,
        data: TSingleBase
    };
}

/***** GENERATE ATOM *****/
export const _generateMousePositionsAtom = (baseStatus: NBaseSocket.TBaseAtom) => {
    /***** ATOM *****/
    const base = atom<NMousePosition.Base>({
        event: 'mousePosition',
        data: [],
    })

    /***** GETTER/SETTER *****/
    const getter = (get: Getter) => ({ 
        ...get(base), 
        status: get(baseStatus) 
    });

    const setter = (get: Getter, set: Setter, data: Partial<NMousePosition.Base>) => {
        const previousBase = get(base);

        set(base, {
            ...previousBase,
            ...data
        })
    }

    /***** RETURN *****/
    return atom(getter, setter);
}