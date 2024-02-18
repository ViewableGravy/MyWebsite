import { createContext, useContext } from "react";


export const HeaderContext = createContext({
    isOpen: false,
    isMobile: false
});

export const useHeader = () => useContext(HeaderContext);