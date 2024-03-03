/***** BASE IMPORTS *****/
import { type Getter, type Setter, atom } from "jotai/vanilla";
import { ReadyState } from "react-use-websocket";
import { NBaseSocket, convertStatusToServiceStatus } from ".";

/***** TYPE DEFINTIONS *****/
export namespace TService {
    export type Base = {
        monitor_name: string,
        status: string,
        type: 'http' | 'port' | 'ping',
    }

    export type HTTP = Base & {
        monitor_name: string,
        status: string,
        type: 'http',
        url: string,
    }

    export type Port = Base & {
        monitor_name: string,
        status: string,
        type: 'port',
        port: number,
    }

    export type Ping = Base & {
        monitor_name: string,
        status: string,
        type: 'ping',
    }

    export type FromType<T extends 'http' | 'port' | 'ping'> = 
        T extends 'http' ? HTTP :
        T extends 'port' ? Port :
        T extends 'ping' ? Ping :
        never;

    export type TServiceStatus = {
        event: 'serviceStatus',
        data: Array<TService.FromType<'http'> | TService.FromType<'port'> | TService.FromType<'ping'>>
    }

    export interface TSend extends NBaseSocket.TBaseSend {
        event: 'serviceStatus',
    }
}

export const _generateServiceStatusAtoms = (baseStatus: NBaseSocket.TBaseAtom) => {
    const base = atom<TService.TServiceStatus>({
        event: 'serviceStatus',
        data: [],
    })   

    const getter = (get: Getter) => ({
        ...get(base),
        status: get(baseStatus)
    }) 

    const setter = (get: Getter, set: Setter, data: Partial<TService.TServiceStatus>) => {
        const previousStatusAtom = get(base);

        set(base, {
            ...previousStatusAtom,
            ...data
        })
    }

    return atom(getter, setter);
}