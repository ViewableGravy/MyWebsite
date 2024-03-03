/***** BASE IMPORTS *****/
import { useAtom } from "jotai/react";
import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { z } from "zod";

/***** STORE IMPORTS *****/
import { store } from "store";
import { NSocketProvider, SocketContext, webSocketAPI } from "./own";

/***** UTILITIES *****/
import { jsonParse } from "utilities/functions/jsonParse";

/**
 * Provider component that provides the socket context to the application. This allows
 * the application to use the socket endpoint provided at '/api/socket' to send and receive
 * messages.
 */
export const SocketProvider: NSocketProvider.TSocketProvider = ({ children }) => {
    /**** STATE *****/
    const [,set] = useAtom(store.sockets.setSocketAtoms);
    
    /**** HOOKS *****/
    const { sendJsonMessage: send, readyState } = useWebSocket(webSocketAPI, {
        onMessage: (message) => {
            const data = jsonParse(message.data, z.object({
                event: z.string(),
                data: z.any(),
            }));

            set(data);
        },
        shouldReconnect: () => true,
    });

    /**** EFFECTS *****/
    useEffect(() => {
        set({ status: readyState });
    }, [readyState])
    
    /**** FUNCTIONS *****/
    const leave: NSocketProvider.TLeave = (rooms) => {
        send({ event: 'unsubscribe', data: rooms });
    }

    /**** RENDER *****/
    return (
        <SocketContext.Provider value={{ send, leave }}>
            {children}
        </SocketContext.Provider>
    )
}