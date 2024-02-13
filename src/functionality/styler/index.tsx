import { useStore } from 'functionality/state/state';
import './_ThemedStyles.scss'

type TUseThemedStyles = () => {
  color: {
    primary: string,
    secondary: string,
    black: string,
    white: string,
    link: string
  }
}

const useThemedStyles: TUseThemedStyles = () => {
  const [theme] = useStore((store) => store.theme);

  return {
    color: {
      primary: `color--primary-${theme}`,
      secondary: `color--secondary-${theme}`,
      black: `color--black`,
      white: `color--white`,
      link: `color--link-${theme}`
    }
  }
}

export default useThemedStyles;