import React, { Dispatch, useEffect } from "react";
import { updateAuthToken, refreshOrExpireExistingtoken } from "./authentication";
import { type } from "os";

//https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context

//todo, automatically handle authentication logic here when initializing the application (check local storage and authing)

type TDispatch = (props: any) => undefined;

export const globalStateContext = React.createContext({});
export const dispatchStateContext = React.createContext<Dispatch<{ [key: string]: any }>>(() => undefined);

export const useGlobalState = (): [{ [key: string]: any }, Dispatch<{ [key: string]: any }>] => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext)
];

export const GlobalStateProvider = ({ children }: { children: JSX.Element }) => {

  const [state, dispatch] = React.useReducer(
    (state: any, newValue: any): any => {
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