import React, { Fragment } from "react";
import { TStore } from "../types";
import { useMediaListener } from "./eventListener";

export const defaultStore = {
  draftMode: false,
  token: null,
  username: null,
  theme: 'dark',
  media: 'xs',
  
} as TStore;

type TStartupHooksProps = {
  children: React.ReactNode
}

type TStartupHooks = (props: TStartupHooksProps) => JSX.Element;

export const StartupHooks: TStartupHooks = ({ children }) => {
  useMediaListener();

  return (
    <Fragment>
      {children}
    </Fragment>
  );
}