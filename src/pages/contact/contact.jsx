import React from "react"
import { createUseStyles } from "react-jss"
import { Menu } from "../blog/menu/menu"
import { ContactInformation } from "./contact_information"
import { ContactForm } from "./contact_form"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const styles = {
  background: {
    '--primary': '#191731',
    '--font-deselected': '#8e7c9b',
    '--secondary': '#a91079',
    '--secondary-50': '#ca63aa',

    backgroundColor: 'var(--primary)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    overflow: 'visible',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: '100vw',
    marginTop: '200px',
    '& *' : {
      'box-sizing': 'border-box',
    },
    '@media screen and (max-width: 1280px)': {
      marginTop: '0px',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'stretch'
    }
  },
  menu: {
    paddingLeft: 'max(calc((100vw - 1240px) / 2), 40px)', //extra 10 for margin on title text
    paddingRight: 'max(calc((100vw - 1230px) / 2), 40px)',
    margin: 'auto',
    backgroundColor: 'var(--primary)'
  }
}

const useStyle = createUseStyles(styles)

export const Contact = () => {
  const classes = useStyle();

  return (
    <>
      <Menu author="ViewableGravy" style={styles.menu} />
      <section className={classes.background}>
        <ContactInformation />
        <ContactForm />
      </section>
    </>
  );
}