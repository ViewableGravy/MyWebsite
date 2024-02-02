import { useState } from "react";

/**
 * Hook to check if the mouse is down on the element
 */
export const useIsMouseDown = () => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    
    const onMouseDown = () => {
        setIsMouseDown(true);
    };
    
    const onMouseUp = () => {
        setIsMouseDown(false);
    };
    
    return [isMouseDown, { onMouseDown, onMouseUp }];
}