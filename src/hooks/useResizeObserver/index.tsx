import { useEffect, useRef } from "react";

type TUseResizeObserver = (onResize: (entry: ResizeObserverEntry) => void) => React.MutableRefObject<HTMLDivElement | null>;
export const useResizeObserver: TUseResizeObserver = (onResize) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => onResize(entry));

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [onResize])

    return ref;
}