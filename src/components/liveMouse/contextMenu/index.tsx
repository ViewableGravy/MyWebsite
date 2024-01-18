import { CSSProperties } from "react";
import "./_ContextMenu.scss"

type TContextMenu = React.FC<{
  items: {
    label: string,
    onClick: () => void,
  }[],
  arcRadius: number,
  position: 'right' | 'left'
}>

export const ContextMenu: TContextMenu = ({ items, arcRadius, position }) => {

  //todo - add arcRadius and position to styles

  /***** RENDER *****/
  return (
    <div>
      {items.map((item) => (
        <div key={item.label} onClick={item.onClick} className="contextMenu__item">
          {item.label}
        </div>
      ))}
    </div>
  )
};