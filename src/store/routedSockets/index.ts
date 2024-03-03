import { PrimitiveAtom, atom } from "jotai/vanilla";
import { TService, _generateServiceStatusAtoms } from "./serviceStatus";
import { NMousePosition, _generateMousePositionsAtom } from "./mousePosition";
import { ReadyState } from "react-use-websocket";

export namespace NBaseSocket {
    export type TStatus = 'uninstantiated' | 'connecting' | 'open' | 'closing' | 'closed';

    export type TBaseAtom = PrimitiveAtom<TStatus>

    export interface TBaseSend {
        event: string,
        data?: any,
    } 
}

export const ROUTE_IDENTIFIERS = {
    MOUSE_POSITION: 'mousePosition',
    SERVICE_STATUS: 'serviceStatus',
} as const;

export const convertStatusToServiceStatus = (status?: ReadyState) => {
    switch (status) {
        case ReadyState.CLOSED:
            return 'closed';
        case ReadyState.CLOSING:
            return 'closing';
        case ReadyState.CONNECTING:
            return 'connecting';
        case ReadyState.OPEN:
            return 'open';
        case ReadyState.UNINSTANTIATED:
            return 'uninstantiated';
        default:
            return undefined;
    }
}

type TSocketResponseType = Partial<NMousePosition.Base> | Partial<TService.TServiceStatus>

export const _generateSocketsAtoms = () => {
    const baseStatus = atom<NBaseSocket.TStatus>('uninstantiated')
    const socketAtoms = {
        serviceStatus: _generateServiceStatusAtoms(baseStatus),
        mousePosition: _generateMousePositionsAtom(baseStatus)
    }

    const setSocketAtoms = atom<null, [TSocketResponseType & { status?: ReadyState }], void>(
        null,
        (get, set, { status, ...data }) => {
            if (status && convertStatusToServiceStatus(status) !== get(baseStatus)) {
                set(baseStatus, convertStatusToServiceStatus(status) ?? get(baseStatus));
            }

            switch (data.event) {
                case ROUTE_IDENTIFIERS.MOUSE_POSITION:
                    return set(socketAtoms.mousePosition, data);
                case ROUTE_IDENTIFIERS.SERVICE_STATUS:
                    return set(socketAtoms.serviceStatus, data);
                default:
                    return;
            }
        }
    );

    return {
        /**
         * Setter that should be used by the socket instance to set the atoms. Since there should
         * only be a single socket instance, this should be the only way to set the atoms.
         */
        setSocketAtoms,
        ...socketAtoms,
    };
};