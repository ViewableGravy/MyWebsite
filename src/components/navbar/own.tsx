import { createContext, useContext } from "react";


export const HeaderContext = createContext({
    isSmall: false,
    isMobile: false
});

export const useHeader = () => useContext(HeaderContext);