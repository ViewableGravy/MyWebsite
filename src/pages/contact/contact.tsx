import { createUseStyles } from "react-jss"
import { ContactInformation } from "./contact_information"
import { ContactForm } from "./contact_form"
import { Header } from "components/navbar"
import { calc } from "utilities/functions/calc"
import { useMedia } from "hooks/useMedia"
import { useWindowDimensions } from "functionality/helper"
import { useMediaListener } from "functionality/state/default/eventListener"

const useStyle = createUseStyles<'background', { isMobile: boolean }>({
  background: {
    '--primary': '#191731',
    '--font-deselected': '#8e7c9b',
    '--secondary': '#a91079',
    '--secondary-50': '#ca63aa',
    paddingTop: ({ isMobile }) => isMobile ? 70 : 160,
    backgroundColor: 'var(--primary)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    overflow: 'visible',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: '100vw',
    '& *' : {
      'box-sizing': 'border-box',
    },
    '@media screen and (max-width: 1280px)': {
      paddingTop: 70,
      marginTop: 0,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'stretch'
    },
    '@media screen and (min-width: 1280px)': {
      paddingTop: '250px !important',
    }
  }
})

export const Contact = () => {
  const isMobile = useMedia(['xs', 'sm']);
  const classes = useStyle({ isMobile });

  const headerProps = Header.useHeaderProps({
    width: [100, calc('100vw', '-', 60), 1220],
  });

  return (
    <>
      <Header {...headerProps} />
      <section className={classes.background}>
        <ContactInformation />
        <ContactForm />
      </section>
    </>
  );
}