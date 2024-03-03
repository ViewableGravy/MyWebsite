/***** BASE IMPORTS *****/
import React from "react";

/***** STORE IMPORTS *****/
import { NMousePosition } from "store/routedSockets/mousePosition";
import { TService } from "store/routedSockets/serviceStatus";
import { NBaseSocket } from "store/routedSockets";

/***** TYPE DEFINTIONS *****/
export namespace NSocketProvider {
    export type TSocketContext = {
        /**
         * Function to send a message to the server.
         */
        send: (message: TSendObject) => void,

        /**
         * Function to leave a room. This is common for rooms that are only necessary when the component is mounted
         * such as the serviceStatus room/route
         */
        leave: (rooms: Array<TSendObject['event']>) => void
    }

    export type TSendObject = (NMousePosition.TSend | TService.TSend) & NBaseSocket.TBaseSend
    export type TLeave = (rooms: Array<TSendObject['event']>) => void
    export type TSend = (message: TSendObject) => void

    export type TSocketProvider = React.FC<{ 
        children: React.ReactNode
    }>
}

/***** CONTEXT *****/
export const SocketContext = React.createContext<NSocketProvider.TSocketContext>({
    send: () => void 0,
    leave: () => void 0
});

export const useSocketContext = () => React.useContext(SocketContext);

/***** CONSTS *****/
const server = {
    host: import.meta.env.VITE_APP_BACKEND_SERVER || "localhost",
    port: import.meta.env.VITE_APP_BACKEND_PORT || "3002",
    protocol: import.meta.env.VITE_APP_WEBSOCKET_PROTOCOL || 'wss',
} as Record<string, string>;

export const webSocketAPI = `${server.protocol}://${server.host}:${server.port}/api/socket`;

