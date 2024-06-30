import { useHover } from '@uidotdev/usehooks'
import { createContext, useContext } from 'react'

type ChildrenProps = {
  hovered: boolean
}

type Hover = React.FC<{
  children: React.ReactNode | ((props: ChildrenProps) => React.ReactElement)
}>

const HoverContext = createContext<{ hovered: boolean }>({ hovered: false })

const _Hover: Hover = ({ children }) => {
  /***** HOOKS *****/
  const [hoverRef, hovered] = useHover()

  /***** RENDER HELPERS *****/
  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ hovered })
    }

    return children
  }

  /***** RENDER *****/
  return (
    <HoverContext.Provider value={{ hovered }}>
      <div ref={hoverRef}>
        {renderChildren()}
      </div>
    </HoverContext.Provider>
  )
}


export const Hover = Object.assign(_Hover, {
  useContext: () => useContext(HoverContext)
})