// Using this function to learn JSS concepts

const media = ({minWidth, maxWidth}) => {
  if (minWidth === undefined && maxWidth === undefined) return `@media only screen`
  if (minWidth === undefined && maxWidth !== undefined) return `@media only screen and (max-width: ${maxWidth}px)`
  if (minWidth !== undefined && maxWidth === undefined) return `@media only screen and (min-width: ${minWidth}px)`
  return `@media only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
}

const nthChild = (n) => `&:nth-child(${n})`
const px = (...args) => args.map(arg => typeof(arg) === 'number' ? `${arg}px` : arg).join(' ');
const vw = (...args) => args.map(arg => typeof(arg) === 'number' ? `${arg}vw` : arg).join(' ');
const vh = (...args) => args.map(arg => typeof(arg) === 'number' ? `${arg}vh` : arg).join(' ');
const rem = (...args) => args.map(arg => typeof(arg) === 'number' ? `${arg}rem` : arg).join(' ');
const percent = (...args) => args.map(arg => typeof(arg) === 'number' ? `${arg}%` : arg).join(' ');

export const styles = {
  header: {
    padding: px(20, 20, 0, 20),
    maxWidth: px(1400),
    margin: 'auto',
  },
  container: {
    maxWidth: px(1200),
    margin: 'auto'
  },
  title: {
    padding: px(50, 40, 0, 0),
    margin: px(40, 0, 5, 60),
    maxWidth: px(1400),
    fontSize: rem(4),
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#ffffff',
    position: 'relative',
    zIndex: 2,
    [media({maxWidth: 475})]: {
      fontSize: rem(2.5),
      paddingTop: px(10),
      textAlign: 'center',
    },
    [media({minWidth: 475, maxWidth: 900})]: {
      fontSize: rem(3),
    },
    [media({minWidth: 900, maxWidth: 1200})]: {
      marginLeft: vw(5),
    }
  },
  blurb: {
    margin: px(0, 0, 40, 60),
    padding: px(10, 40, 0, 0),
    maxWidth: px(475),
    fontSize: rem(1.5),
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    zIndex: 2,
    [media({maxWidth: 475})]: {
      textAlign: 'center',
      fontSize: rem(1.2),
      marginBottom: 0,
    },
    [media({minWidth: 475, maxWidth: 900})]: {
      fontSize: rem(1.3),
    },
    [media({minWidth: 900, maxWidth: 1200})]: {
      marginLeft: vw(5),
    }
  },
  contactBackground: {
    opacity: percent(50),
    maxWidth: percent(100),
    pointerEvents: 'none',
    [media({maxWidth: 475})]: {
      position: 'static',
    },
    [media({minWidth: 475})]: {
      position: 'absolute',
      top: percent(50),
      transform: 'translateY(-50%)',
      'z-index': 1,
    },
    [media({minWidth: 475, maxWidth: 900})]: {
      top: percent(35),
    }
  },
  contact: {
    padding: px(20, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    [media({maxWidth: 900})]: {}
  },
  fieldContainer: {
    margin: px(0, 0, 20, 0),
    width: percent(90),
    minHeight: px(60),
    borderRadius: px(10),
    overflow: 'hidden',
    color: 'white',
    transition: 'all 1s cubic-bezier(0.91, 0, 1, 1)',
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
        borderRadius: px(10, 0, 0, 10),
        marginLeft: percent(10),
      },
      [nthChild('even')]: {
        borderRadius: px(0, 10, 10, 0),
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
        marginLeft: percent(5),
        width: percent(85)
      },
      [nthChild('even')]: {
        marginLeft: percent(10),
        width: percent(85)
      },
    }
  },
  field: {
    padding: px(0, 20, 0, 20),
    all: 'unset',
    width: 'calc(100% - 40px)',
    minHeight: px(60),
    wordBreak: 'break-word',
    display: 'block',
    fontSize: rem(1.2),
    fontWeight: 'bold',
  },
  textarea: {
    paddingTop: px(15),
    fontSize: rem(1.2),
  }
}