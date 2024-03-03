/***** BASE IMPORTS *****/
import { useAtom } from "jotai/react";
import { useCallback, useEffect, useMemo } from "react";
import { z } from "zod";
import useWebSocket from "react-use-websocket";

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
    const leave: NSocketProvider.TLeave = useCallback((rooms) => {
        send({ event: 'unsubscribe', data: rooms });
    }, []);

    /**** CONTEXT *****/
    const context = useMemo(() => ({ 
        send, leave 
    }), []);

    /**** RENDER *****/
    return (
        <SocketContext.Provider value={context}>
            {children}
        </SocketContext.Provider>
    )
}