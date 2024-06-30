import classNames from "classnames"
import { useThemedStyles, type Tokens } from "../../../functionality/styler/useThemedStyles"
import { useStyle } from "../../../hooks/useStyle"

import './_Border.scss'

/***** TYPE DEFINITIONS *****/
type Border = React.FC<{
  radius?: number,
  top?: boolean | number,
  left?: boolean | number,
  right?: boolean | number,
  bottom?: boolean | number,
  all?: boolean | number,
  color?: Tokens,
  children: React.ReactNode,
  className?: string,
  shadow?: boolean
}>

type BorderCSSVariables = '--border-color' | '--border-top' | '--border-left' | '--border-right' | '--border-bottom' | '--border-all' | '--border-radius'

/***** COMPONENT START *****/
export const Border: Border = ({ radius, className, top, left, right, bottom, all, color, children, shadow }) => {
  /***** HOOKS *****/
  const selectedColor = useThemedStyles((data) => color ? data[color] : data.color_primary)  

  const style = useStyle<BorderCSSVariables>({
    '--border-color': selectedColor,
    '--border-top': top,
    '--border-left': left,
    '--border-right': right,
    '--border-bottom': bottom,
    '--border-all': all,
    '--border-radius': radius
  }, { number: useStyle.transformers.pixel.number })

  /***** RENDER HELPERS *****/
  const classes = classNames("Border", className, {
    "Border--top": top,
    "Border--left": left,
    "Border--right": right,
    "Border--bottom": bottom,
    "Border--all": all,
    "Border--radius": radius,
    "Border--shadow": shadow
  })

  /***** RENDER *****/
  return (
    <div style={style} className={classes}>
      {children}
    </div>
  )
}