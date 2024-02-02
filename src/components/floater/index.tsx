/**
 * @fileoverview - In the future, if I get more use out of this component, the animation should be moved
 * to JSS so that the timings can be adjusted using props for a bit more dynanism.
 */

/***** BASE IMPORTS *****/
import classNames from "classnames";

/***** CONSTS *****/
import './_Floater.scss'
import React, { useLayoutEffect } from "react";

type TFloater = React.FC<{
    children: React.ReactNode;
    className?: string;
}>

/**
 * Provides a wrapper that will float when it is hovered. 
 */
export const Floater: TFloater = ({ children, className }) => {
    const [height, setHeight] = React.useState<undefined | number>(undefined);
    const innerRef = React.useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (innerRef.current) {
            setHeight(innerRef.current.clientHeight + 2); // +2 from the 2px border
        }
    }, [children])

    return (
        <div className={classNames("Floater", className)} style={{ minHeight: height }} >
            <div className="Floater__inner" ref={innerRef}>
                {children}
            </div>
        </div>
    )
}
