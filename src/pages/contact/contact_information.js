import React from "react";
import { createUseStyles } from "react-jss";

const styles = {
  outer: {
    maxWidth: '600px',
    minHeight: '800px',
    padding: '40px',
    flexGrow: '1',
    // alignSelf: 'stretch',
    '@media screen and (max-width: 1280px)': {
      minHeight: '200px',
      maxWidth: 'none',
      padding: '50px 40px 20px 40px',
      width: 'clamp(390px, 700px, 100%)'
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    wordWrap: 'break-word',
    maxWidth: '500px',
    color: '#eeeeee',
    margin: 0,
    display: 'block',
    '& > span': {
      color: 'var(--secondary)',
    },
    '@media (width < 1280px)': {
      fontSize: '2rem',
    }
  },
  contacts: {
    marginBottom: '50px',
    color:' #eeeeee',
    fontWeight: 'bold',
    '& > a': {
      padding: '20px',
      border: '1px solid transparent',
      borderRadius: '10px',
      transition: 'border 0.2s ease-in-out, background-color 0.2s ease-in-out',
      display: 'block',
      margin: '20px 0 20px 0',
      color: 'white',
      textDecoration: 'none',
    },
    '&:not(:has(a:focus)):not(:has(a:hover)) > a:nth-child(1), & > a:hover, & > a:focus': {
      outline: 'none',
      cursor: 'pointer',
      background: '#420650',
      border: '1px solid var(--secondary)',
    },
    '& > a > span': {
      fontSize: '1.4rem',
      marginBottom: '10px'
    },
    '& > a > i': {
      marginRight: '10px',
      color: 'var(--secondary)'
    },
    '@media (width < 1280px)': {
      marginTop: '20px',
      marginBottom: '0',
      padding: '15px 0 15px 0',

      '& > a': {
        margin: '10px 0 10px 0',
      },
      '& > a > span': {
        fontSize: '1.2rem',
      },
    }
  },
  socials: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'left',
    alignItems: 'end',
    '& > a': {
      width: '60px',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      transition: 'background-color 0.2s ease-in-out',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    '&:not(:has(a:focus)):not(:has(a:hover)) > a:nth-child(3), & > a:hover, & > a:focus': {
      outline: 'none',
      backgroundColor: 'var(--secondary)'
    },
    '& > a > i': {
      fontSize: '1.7rem',
      color: '#eeeeee'
    },
    '@media (width < 1280px)': {
      height: 'fit-content',
      justifyContent: 'space-evenly',
      gap: 0,
      '& > a': {
        margin: '10px 0 10px 0'
      }
    }
  }
}

const useStyle = createUseStyles(styles);

export const ContactInformation = () => {
  const classes = useStyle();

  return (
    <div className={classes.outer}>
      <h1 className={classes.title}>Let me know what you <span className="title-special">love</span> about my site</h1>
      <div className={classes.contacts}>
        <a href="mailto:contact@gravy.cc">
          <i className="fa-solid fa-envelope"></i>
          <span>contact@gravy.cc</span>
        </a>
        <a href="#">
          <i className="fa-solid fa-phone"></i>
          <span>+61 123 456 789</span>
        </a>
        <a href="https://www.google.com/maps/place/Melbourne+VIC/@-37.9725665,145.0531353,9z">
          <i className="fa-sharp fa-solid fa-location-dot"></i>
          <span>Melbourne, Victoria</span>
        </a>
      </div>
      <div className={classes.socials}>
        <a href="https://www.facebook.com/ViewableGravy">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com/yamummas">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="https://github.com/ViewableGravy">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://discord.gg/EJjvZepmst">
          <i className="fa-brands fa-discord"></i>
        </a>
        <a href="https://www.instagram.com/viewablegravy/">
          <i className="fa-brands fa-instagram"></i>
        </a>
      </div>
    </div>
  );
}