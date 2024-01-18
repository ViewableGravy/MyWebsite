import { useRouterState } from '@tanstack/react-router';
import { safeParse } from 'hooks/useStatus';
import { useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const server = {
    host: import.meta.env.VITE_APP_BACKEND_SERVER || "localhost",
    port: import.meta.env.VITE_APP_BACKEND_PORT || "3002",
    protocol: import.meta.env.VITE_APP_WEBSOCKET_PROTOCOL || 'wss',
} as Record<string, string>;

const wsapi = `${server.protocol}://${server.host}:${server.port}/api/socket`;

type TUseMousePositionMessage = {
    event: 'mousePosition',
    data: Array<{
        x: number,
        y: number,
        username: string,
        route: string,
    }>
}

const useLocalMousePosition = () => {
    const mousePosition = useRef({ x: 0, y: 0 });
    const hasMouseMoved = useRef(false);
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    const handleMouseMove = (event: MouseEvent) => {
        mousePosition.current = {
            x: event.clientX,
            y: event.clientY,
        };
        hasMouseMoved.current = true;
        timeout.current && clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            hasMouseMoved.current = false;
        }, 300);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return {
        mousePosition,
        hasMouseMoved,
    };
}

export const useMousePosition = (username: string) => {
    const { lastMessage, readyState, sendJsonMessage } = useWebSocket(wsapi, {
        shouldReconnect: () => true,
    });
    const { mousePosition, hasMouseMoved } = useLocalMousePosition();
    const { location: { pathname } } = useRouterState();

    useEffect(() => {
        const interval = setInterval(() => {
            if (!hasMouseMoved.current) return;

            sendJsonMessage({ 
                event: 'mousePosition',
                data: {
                    x: mousePosition.current.x,
                    y: mousePosition.current.y,
                    username,
                    route: pathname,
                }
            });
        }, 100);

        return () => clearInterval(interval);
    }, [pathname]);

    const _data = safeParse<TUseMousePositionMessage>(lastMessage?.data);
    const isInitializing = readyState !== ReadyState.OPEN;
    const isError = _data && 'error' in _data;
    const isSuccess = _data && 'data' in _data && _data.event === 'mousePosition';
    const data = _data && 'error' in _data ? null : _data?.data ?? null

    return {
        data,
        isInitializing,
        isSuccess,
        isError
    }
};
