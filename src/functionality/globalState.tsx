import React, { Dispatch, useEffect, useState } from "react";
import { updateAuthToken, refreshOrExpireExistingtoken } from "./authentication/authentication";
import { type } from "os";

//https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context

//todo, automatically handle authentication logic here when initializing the application (check local storage and authing)

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

export type TStore = {
  draftMode: boolean;
  token: string | null;
  username: string | null;
  theme: 'light' | 'dark';
}

export type TDispatch = (value: Partial<TStore>) => void;

export const useStoreData = () => {
  const store = React.useRef<TStore>({
    draftMode: false,
    token: null,
    username: null,
    theme: 'dark'
  });

  const get = React.useCallback(() => {
    return store.current;
  }, []);
  
  const subscribers = React.useRef(new Set<() => void>());
  
  const set = React.useCallback((value: Partial<TStore>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = React.useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => { subscribers.current.delete(callback) };
  }, []);

  //On Application Load
  useEffect(() => {
    refreshOrExpireExistingtoken(set);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}

const storeContext = React.createContext<ReturnType<typeof useStoreData> | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useStoreData();

  return (
    <storeContext.Provider value={store}>
      {children}
    </storeContext.Provider>
  );
}

export const useStore = (
  selector: (store: TStore) => any
): [TStore, TDispatch] => {
  const store = React.useContext(storeContext);
  if (!store) 
    throw new Error('useStore must be used within a StoreProvider.');

  const [state, setState] = useState(
    selector(store.get())
  );

  useEffect(() => {
    return store.subscribe(() => setState(store.get()));
  }, []);


  return [state, store.set];
}