import React from "react";

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
    (state, newValue) => ({ ...state, ...newValue }),
    {}
  );

  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};