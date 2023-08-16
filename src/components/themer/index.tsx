import React from "react";
import { useStore } from 'functionality/state/state';

type TThemerProps = {
  children: React.ReactNode
  light: boolean,
  dark: boolean,
}

type TThemer = React.FC<TThemerProps>

const Themer: TThemer = ({ children, light, dark }) => {
  const [{ theme }, dispatch] = useStore((store) => ({
    theme: store.theme
  }));

  if (!light && !dark) throw new Error('Themer must be passed either light or dark prop');

  if (theme === 'light' && dark) {
    dispatch({ theme: 'dark' });
  }

  if (theme === 'dark' && light) {
    dispatch({ theme: 'light' });
  }

  return (<>{children}</>);
}

export default Themer;
