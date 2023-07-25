import { TMediaKey } from "hooks/useMedia";

export type TStore = {
  draftMode: boolean;
  token: string | null;
  username: string | null;
  theme: 'light' | 'dark';
  media: TMediaKey;
}

export type TDispatch = (value: Partial<TStore>) => void;