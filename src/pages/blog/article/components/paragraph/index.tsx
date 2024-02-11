import classNames from "classnames"
import { ConstructComponent, type TComponentProps } from "../componentConstructor"

import './_Paragraph.scss'
import Text from "components/text"
import React, { createElement } from "react"
import { TextProps } from "components/text/types"
import { useResizeObserver } from "hooks/useResizeObserver"
import { useNumberOfLines } from "hooks/useNumberOfLines"

type TParagraph = React.FC<TComponentProps<'Paragraph'>>
type TRenderTextArray = React.FC<{ text: TComponentProps<'Paragraph'>['children'] }>

const RenderTextArray: TRenderTextArray = ({ text }) => {
  if (!Array.isArray(text)) return null;

  return text.map(({ type, ...props }, index) => (
    <ConstructComponent 
      key={index}
      allowed={['Span', 'Anchor']} 
      type={type}
      props={props}
    />
  ))
}

export const Paragraph: TParagraph = ({ isFirst, children }) => {
  const [ref, { numberOfLines }] = useNumberOfLines();

  /** 
   * Sometimes, we must sacrifice to satisfy the typescript overlords, 
   * I am confident they will be pleased with this offering
   */
  const createProps = <T extends Omit<TextProps, 'children'>>(baseProps: T) => {
    if (typeof children === 'string') {
      return Object.assign(baseProps, {
        innerHTML: true,
        children: children as string
      } as const)
    } 

    return Object.assign(baseProps, {
      innerHTML: false,
      children: <RenderTextArray text={children} />
    } as const)
  }

  const props = createProps({
    sizeCustom: "1.18rem",
    paragraph: true,
    ref,
    className: classNames("Paragraph", { "Paragraph--first": isFirst && numberOfLines > 1 })
  })

  return <Text {...props} />
}