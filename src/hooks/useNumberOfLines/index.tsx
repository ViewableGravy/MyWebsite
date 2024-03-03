/***** BASE IMPORTS *****/
import { useState } from "react";

/***** HOOK IMPORTS *****/
import { useResizeObserver } from "hooks/useResizeObserver";

/*
 * Gets the number of lines from a ref
 */
export const useNumberOfLines = () => {
  const [numberOfLines, setLines] = useState(0);
  
  const ref = useResizeObserver(() => {
    if (!ref.current) return;

    const lineHeight = parseInt(getComputedStyle(ref.current).lineHeight);
    const height = ref.current.clientHeight;

    const _numberOfLines = Math.round(height / lineHeight);

    if (_numberOfLines !== numberOfLines) {
      setLines(_numberOfLines);
    }
  }, undefined, [numberOfLines]);

  return [ref, { numberOfLines }] as const;
}
