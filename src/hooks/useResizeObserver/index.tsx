import { useEffect, useRef } from "react";

type TUseResizeObserver = (onResize: (entry: ResizeObserverEntry) => void, ref?: React.RefObject<HTMLElement>, deps?: any[]) => React.MutableRefObject<HTMLElement | undefined>;
export const useResizeObserver: TUseResizeObserver = (onResize, ref, deps = []) => {
    const _ref = useRef<HTMLElement>();

    useEffect(() => {
        if (ref?.current)
            _ref.current = ref.current;
    }, [ref?.current])

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => onResize(entry));

        if (_ref.current) {
            observer.observe(_ref.current);
        }

        return () => observer.disconnect();
    }, [onResize, _ref.current, ...deps])

    return _ref;
}