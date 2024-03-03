import { useResizeObserver } from "hooks/useResizeObserver";
import { useRef, useState } from "react";

/**
* Indicates whether the current element is overflowing its parent
*/
export const useIsOverflowingParent = (ref: React.RefObject<HTMLParagraphElement>, options?: { rerender: boolean }): boolean => {
 const [, rerender] = useState(0);
 const isOverflowing = useRef(false);
 
 useResizeObserver(() => {
   const getIsOverflowing = () => {
     if (!ref.current) return false; 
     if (!ref.current.parentElement) return false;
 
     const el = ref.current;
     const parent = ref.current.parentElement;
     const bottom = el.getBoundingClientRect().bottom;
     const parentBottom = parent.getBoundingClientRect().bottom;
 
     return bottom > parentBottom;
   };

   if (getIsOverflowing()) {
     isOverflowing.current = true;

     if (options?.rerender) {
       rerender((prev) => prev + 1);
     }
   }

   if (!getIsOverflowing()) {
     isOverflowing.current = false;

     if (options?.rerender) {
       rerender((prev) => prev + 1);
     }
   }
 }, ref, [options?.rerender]);

 return isOverflowing.current;
}
