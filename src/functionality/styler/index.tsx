import { useStore } from 'functionality/state/state';
import './_ThemedStyles.scss'

const useThemedStyles = () => {
  const [theme] = useStore((store) => store.theme);

  return {
    color: {
      primary: `color--primary-${theme}`,
      secondary: `color--secondary-${theme}`,
      black: `color--black`,
      white: `color--white`,
      link: `color--link-${theme}`
    },
    background: {
      primary: `background--primary-${theme}`,
      header: `background--header-${theme}`,
    }
  } as const;
};

export default useThemedStyles;