import { useMemo, useState } from "react";
import "./_ContextMenu.scss"

import contextMenuBackground from 'assets/images/contextMenu/context-menu.png'
import follow from 'assets/images/contextMenu/follow-test.png'
import selectedBackground3 from 'assets/images/contextMenu/selected-background.png'
import classNames from "classnames";

type TContextMenu = React.FC<{
  isOpen: boolean,
  items: {
    first?: () => void,
    second?: () => void,
    third?: () => void,
  },
  delay?: {
    initiate: () => void,
    clear: () => void,
  },
}>

export const ContextMenu: TContextMenu = ({ items, delay, isOpen }) => {
  const [option3Hovered, setOption3Hovered] = useState(false);

  const classes = useMemo(() => ({
    contextMenu: classNames('contextMenu', {
      'contextMenu--show': isOpen,
    }),
    background: 'contextMenu__background',
    option3Hover: classNames('contextMenu__option3Hover', {
      'contextMenu__option3Hover--show': option3Hovered,
    }),
    option3: 'contextMenu__option3',
  }), [isOpen, option3Hovered])

  return (
    <div 
      className={classes.contextMenu}
    >
      <img
        onMouseEnter={delay?.clear}
        onMouseLeave={delay?.initiate}
        className={classes.background} 
        src={contextMenuBackground} 
        alt="context menu" 
      />
      {!!items.third && (
        <>
          <img 
            className={classes.option3Hover}
            src={selectedBackground3}
            alt="follow-hover-effect"
          />
          <img
            className={classes.option3}
            src={follow}
            alt="follow"
            onClick={items.third}
            onMouseEnter={() => setOption3Hovered(true)}
            onMouseLeave={() => setOption3Hovered(false)}
          />
        </>
      )}
    </div>
  )
};