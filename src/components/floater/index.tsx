/**
 * @fileoverview - In the future, if I get more use out of this component, the animation should be moved
 * to JSS so that the timings can be adjusted using props for a bit more dynanism.
 */

/***** BASE IMPORTS *****/
import classNames from "classnames";

/***** CONSTS *****/
import './_Floater.scss'
import React, { useCallback, useLayoutEffect } from "react";
import { useDelayedCallback } from "components/liveMouse/ownVisitorMouse/useDelay";

type TFloater = React.FC<{
    children: React.ReactNode;
    className?: string;
    clickable?: boolean;
    duration?: number;
}>

/**
 * Provides a wrapper that will float when it is hovered. 
 */
export const Floater: TFloater = ({ children, className, clickable = false, duration = 200 }) => {
    /***** STATE *****/
    const [height, setHeight] = React.useState<undefined | number>(undefined);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const innerRef = React.useRef<HTMLDivElement>(null);

    /***** HOOKS *****/
    const { initiate } = useDelayedCallback(() => setIsAnimating(false), duration)

    /***** CALLBACKS *****/
    const handleMouseOver = useCallback(() => setTimeout(() => {
        if (!innerRef.current) return;

        setIsAnimating(true);
        initiate();
    }), [initiate]);

    const handleClick = useCallback(() => clickable && handleMouseOver(), [clickable]);

    /***** EFFECTS *****/
    useLayoutEffect(() => {
        if (innerRef.current) {
            setHeight(innerRef.current.clientHeight + 2); // +2 from the 2px border
        }
    }, [children]);

    /***** CLASSNAMES *****/
    const classes = {
        Floater: classNames("Floater", className),
        Inner: classNames("Floater__inner", { "Floater__inner--animating": isAnimating })
    }

    /***** RENDER *****/
    return (
        <div className={classes.Floater} style={{ minHeight: height }} >
            <div 
                className={classes.Inner}
                ref={innerRef} 
                style={{ animationDuration: `${duration / 1000}s` }}
                onClick={handleClick}
                onMouseEnter={handleMouseOver}
            >
                {children}
            </div>
        </div>
    )
}
