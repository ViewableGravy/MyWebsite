import React from "react";
import * as reactdomclient from 'react-dom/client'
import './index.css';
import { GlobalStateProvider } from './functionality/state/[LEGACY]state';
import { StoreProvider } from './functionality/state/state';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from "@tanstack/react-router";
import { router } from "router";
import { Provider } from "jotai/react";

const queryClient = new QueryClient()
const container = document.getElementById('root') as HTMLElement;
const root = reactdomclient.createRoot(container);

root.render(
  <Provider>
    <GlobalStateProvider>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </QueryClientProvider>
      </StoreProvider>
    </GlobalStateProvider>
  </Provider>
);