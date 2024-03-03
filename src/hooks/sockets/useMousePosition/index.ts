/***** BASE IMPORTS *****/
import { useAtom } from 'jotai/react';
import { useRouterState } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

/***** STORE IMPORTS *****/
import { store } from 'store';

/***** SHARED *****/
import { useSocketContext } from 'components/socketProvider/own';

/***** HOOK START *****/
const useLocalMousePosition = () => {
    const mousePosition = useRef({ x: 0, y: 0 });
    const hasMouseMoved = useRef(false);
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    const handleMouseMove = (event: MouseEvent) => {
        mousePosition.current = {
            x: event.clientX - window.innerWidth / 2, // mouse position relative to the center of the screen
            y: event.clientY
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

/***** HOOK START *****/
export const useMousePosition = (username: string) => {
    const { send } = useSocketContext();
    const [{ status, data }] = useAtom(store.sockets.mousePosition);

    const { mousePosition, hasMouseMoved } = useLocalMousePosition();
    const { location: { pathname } } = useRouterState();

    const isError = data && 'error' in data;
    const isSuccess = data?.length > 0;
    const isInitializing = status === 'open';

    useEffect(() => {
        const interval = setInterval(() => {
            if (!hasMouseMoved.current) return;

            send({
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

    return {
        data,
        isInitializing,
        isSuccess,
        isError
    }
};
