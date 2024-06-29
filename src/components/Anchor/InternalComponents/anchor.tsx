import type { _AnchorProps } from "@laystack/gui/src/components/button/types"
import classNames from "classnames";
import { useStyle } from "../../../hooks/useStyle";

import './_InternalAnchor.scss'

type CSSVariables = '--anchor-decoration'
type Anchor = React.FC<_AnchorProps & {
  decoration?: 'underline' | 'none',
}>

export const _Anchor: Anchor = ({ decoration, ...props }) => {  
  /***** HOOKS *****/
  const style = useStyle<CSSVariables>({
    '--anchor-decoration': decoration
  })

  /***** RENDER HELPERS *****/
  const className = classNames(props.className, {
    'Anchor--decorated': decoration
  })

  /***** RENDER *****/
  return (
    <a {...props} className={className} style={Object.assign(style, props.style)} />
  )
}