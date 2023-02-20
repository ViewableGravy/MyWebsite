// Using this function to learn JSS concepts

const media = ({minWidth, maxWidth}) => {
  if (minWidth === undefined && maxWidth === undefined) return `@media only screen`
  if (minWidth === undefined && maxWidth !== undefined) return `@media only screen and (max-width: ${maxWidth}px)`
  if (minWidth !== undefined && maxWidth === undefined) return `@media only screen and (min-width: ${minWidth}px)`
  return `@media only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
}

const nthChild = (n) => `&:nth-child(${n})`

export const styles = {
  header: {
    paddingRight: '20px',
    paddingLeft: '20px',
    maxWidth: '1400px',
    margin: 'auto',
    paddingTop: '20px',
  },
  container: {
    maxWidth: '1200px',
    margin: 'auto'
  },
  title: {
    paddingTop: '50px',
    paddingRight: '40px',
    maxWidth: '1400px',
    marginBottom: '5px',
    textAlign: 'left',
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: '60px',
    position: 'relative',
    zIndex: 2,
    [media({maxWidth: 475})]: {
      textAlign: 'center',
      fontSize: '2.5rem',
      paddingTop: '10px',
    },
    [media({minWidth: 475, maxWidth: 900})]: {
      fontSize: '3rem',
    },
    [media({minWidth: 900, maxWidth: 1200})]: {
      marginLeft: '5vw',
    }
  },
  blurb: {
    paddingRight: '40px',
    marginBottom: '40px',
    maxWidth: '475px',
    margin: '0 0 0 20px',
    paddingTop: '10px',
    textAlign: 'left',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginLeft: '60px',
    position: 'relative',
    zIndex: 2,
    [media({maxWidth: 475})]: {
      textAlign: 'center',
      fontSize: '1.2rem',
      marginBottom: '0',
    },
    [media({minWidth: 475, maxWidth: 900})]: {
      fontSize: '1.3rem',
    },
    [media({minWidth: 900, maxWidth: 1200})]: {
      marginLeft: '5vw',
    }
  },
  contactBackground: {
    opacity: '50%',
    maxWidth: '100%',
    pointerEvents: 'none',
    [media({maxWidth: 475})]: {
      position: 'static',
    },
    [media({minWidth: 475})]: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      'z-index': 1,
    },
    [media({minWidth: 475, maxWidth: 900})]: {
      top: '35%',
    }
  },
  contact: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px',
    [media({maxWidth: 900})]: {}
  },
  fieldContainer: {
    width: '90%',
    marginBottom: '20px',
    minHeight: '60px',
    borderRadius: '10px',
    overflow: 'hidden',
    color: 'white',
    [nthChild(1)]: {
      border: '1px solid rgba(0, 0, 255, 0.5)',
      background: 'rgba(0, 0, 255, 0.3)',
    },
    [nthChild(2)]: {
      border: '1px solid rgba(255, 0, 0, 0.5)',
      background: 'rgba(255, 0, 0, 0.3)',
    },
    [nthChild(3)]: {
      border: '1px solid rgba(0, 255, 0, 0.5)',
      background: 'rgba(0, 255, 0, 0.3)',
    },
    [nthChild(4)]: {
      border: '1px solid rgba(255, 255, 0, 0.5)',
      background: 'rgba(255, 255, 0, 0.3)',
    },
    [media({maxWidth: 900})]: {
      [nthChild('odd')]: {
        borderRadius: '10px 0 0 10px',
        marginLeft: '10%'
      },
      [nthChild('even')]: {
        borderRadius: '0 10px 10px 0',
      },
      [nthChild(1)]: {
        borderRight: 'none',
      },
      [nthChild(2)]: {
        borderLeft: 'none',
      },
      [nthChild(3)]: {
        borderRight: 'none',
      },
      [nthChild(4)]: {
        borderLeft: 'none',
      }
    },
    [media({minWidth: 900})]: {
      [nthChild('odd')]: {
        marginLeft: '5%',
        width: '85%'
      },
      [nthChild('even')]: {
        marginLeft: '10%',
        width: '85%'
      },
    }
  },
  field: {
    all: 'unset',
    width: 'calc(100% - 40px)',
    // background: 'blue',
    minHeight: '60px',
    paddingLeft: '20px',
    paddingRight: '20px',
    wordBreak: 'break-word',
    display: 'block',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  textarea: {
    paddingTop: '15px',
    fontSize: '1.2rem',
  }
}