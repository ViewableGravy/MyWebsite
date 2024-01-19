import { CSSProperties, useEffect, useRef, useState } from "react";
import "./_ContextMenu.scss"

import contextMenuBackground from 'assets/images/contextMenu/context-menu.png'
import follow from 'assets/images/contextMenu/follow-test.png'
import selectedBackground3 from 'assets/images/contextMenu/selected-background.png'

type TContextMenu = React.FC<{
  items: {
    label: string,
    onClick: () => void,
  }[],
  arcRadius: number,
  position: 'right' | 'left',
  delay?: {
    initiate: () => void,
    clear: () => void,
  }
}>

export const ContextMenu: TContextMenu = ({ items, arcRadius, position, delay }) => {
  
  const [option3Hovered, setOption3Hovered] = useState(false);
  //todo - add arcRadius and position to styles

  /***** RENDER *****/
  // return (
  //   <div
  //     onMouseEnter={delay?.clear}
  //     onMouseLeave={delay?.initiate}
  //   >
  //     {items.map((item) => (
  //       <div key={item.label} onClick={item.onClick} className="contextMenu__item">
  //         {item.label}
  //       </div>
  //     ))}
  //   </div>
  // )

  console.log(delay)

  return (
    <div 
      className="contextMenu"
      onMouseEnter={delay?.clear}
      onMouseLeave={delay?.initiate}
    >
      <img
        className="contextMenu__background" 
        src={contextMenuBackground} 
        alt="context menu" 
      />
      <img 
        className={`contextMenu__option3Hover ${option3Hovered ? 'contextMenu__option3Hover--show' : ''}`}
        src={selectedBackground3}
        alt="follow-hover-effect"
      />
      <img
        className="contextMenu__option3"
        src={follow}
        alt="follow"
        onMouseEnter={() => setOption3Hovered(true)}
        onMouseLeave={() => setOption3Hovered(false)}
      />
    </div>
  )
};