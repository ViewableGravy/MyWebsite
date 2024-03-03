import React from "react";

import { refreshOrExpireExistingtoken } from "../authentication/authentication";
import { TDispatch, TStore } from "./types";
import { StartupHooks, defaultStore } from "./default/initial";

const useStoreData = () => {
  const store = React.useRef<TStore>(defaultStore);

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
  React.useEffect(() => {
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
      <StartupHooks>
        {children}
      </StartupHooks>
    </storeContext.Provider>
  );
}

export const useStore = <T extends any = undefined>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selector: (store: TStore) => T = (store: TStore) => store as any
): [T extends undefined ? TStore : T, TDispatch] => {
  const store = React.useContext(storeContext);
  if (!store) 
    throw new Error('useStore must be used within a StoreProvider.');

  const [state, setState] = React.useState(
    selector(store.get())
  );

  React.useEffect(() => {
    return store.subscribe(() => setState(selector(store.get())));
  }, []);


  return [state as any, store.set];
}