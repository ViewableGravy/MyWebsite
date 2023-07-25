import { TStore } from "../types";
import { useMediaListener } from "./eventListener";

export const defaultStore = {
  draftMode: false,
  token: null,
  username: null,
  theme: 'dark',
  media: 'xs',
} as TStore;

export const StartupHooks = ({ children }: { children: any }) => {
  useMediaListener();

  return children;
}