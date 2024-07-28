/***** BASE IMPORTS *****/
import { useMemo } from "react"
import classNames from "classnames"

/***** UTILITIES *****/
import { useStyle } from "hooks/useStyle"

/***** TYPE DEFINITIONS *****/
type Grid = React.FC<{ 
  columns?: string | readonly (number | string)[],
  rows?: Array<number | string> | string,
  children: React.ReactNode,
  gap?: number | string,
  rowGap?: number | string,
  columnGap?: number | string
}>

export type CSSVariables = 
  | "--grid-template-columns" 
  | "--grid-template-rows" 
  | "--gap" 
  | "--row-gap" 
  | "--column-gap"

/***** CONSTS *****/
import './_Grid.scss'

/***** COMPONENT START *****/
export const Grid: Grid = ({ columns, rows, children, gap, rowGap, columnGap }) => {
  const calculatedColumns = useMemo(() => typeof columns === "string" 
    ? columns 
    : columns?.reduce((acc, val) => `${acc} ${val}`, '')
  , [columns])

  const calculatedRows = useMemo(() => typeof rows === "string"
    ? rows
    : rows?.reduce((acc, val) => `${acc} ${val}`, '')
  , [rows])

  /***** HOOKS *****/
  const styles = useStyle<CSSVariables>({
    '--grid-template-columns': calculatedColumns,
    '--grid-template-rows': calculatedRows,
    '--gap': gap,
    '--row-gap': rowGap,
    '--column-gap': columnGap
  })

  /***** RENDER HELPERS *****/
  const className = classNames("Grid", {
    "Grid--columns": columns,
    "Grid--rows": rows,
    "Grid--gap": gap,
    "Grid--row-gap": rowGap,
    "Grid--column-gap": columnGap
  })
  
  /***** RENDER *****/
  return (
    <div className={className} style={styles}>
      {children}
    </div>
  )
}