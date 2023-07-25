import React from 'react';
import { useStore } from 'functionality/state/state';
import './_ThemedStyles.scss'

type TUseThemedStyles = () => {
  color: {
    primary: string,
    secondary: string,
    black: string,
    white: string,
  }
}

const useThemedStyles: TUseThemedStyles = () => {
  const [{ theme }] = useStore((store) => ({
    theme: store.theme
  }));

  return {
    color: {
      primary: `color--primary-${theme}`,
      secondary: `color--secondary-${theme}`,
      black: `color--black`,
      white: `color--white`,
    }
  }
}

export default useThemedStyles;