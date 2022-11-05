import React, { useEffect } from "react";
import { updateAuthToken } from "./authentication";
import { refreshOrExpireExistingtoken } from "./authentication";

//https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context

//todo, automatically handle authentication logic here when initializing the application (check local storage and authing)

export const globalStateContext = React.createContext({});
export const dispatchStateContext = React.createContext(undefined);

export const useGlobalState = () => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext)
];

export const GlobalStateProvider = ({ children }) => {

  const [state, dispatch] = React.useReducer(
    (state, newValue) => {
      updateAuthToken(newValue);
      //other initializing states here
      return { ...state, ...newValue };
    },
    {}
  );

  //load in the token from local storage
  useEffect(() => {
    refreshOrExpireExistingtoken(dispatch);
  }, []);

  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};