import classNames from "classnames"
import type { TComponentProps } from "../componentConstructor"

import './_Paragraph.scss'
import Text from "components/text"
import { Span } from "../span"
import { Anchor } from "../anchor"

type TParagraph = React.FC<TComponentProps<'Paragraph'>>

export const Paragraph: TParagraph = ({ isFirst, text }) => {
  const renderTextArray = (text: TComponentProps<'Paragraph'>['text']) => {
    if (!Array.isArray(text)) return null;

    return text.map((item, index) => {
      switch (item.type) {
        case 'Span':
          return <Span key={index} {...item.props} />
        case 'Anchor':
          return <Anchor key={index} {...item.props} />
        default:
          return null
      }
    })
  }

  /** 
   * Sometimes, we must sacrifice to satisfy the typescript overlords, 
   * I am confident they will be pleased with this offering
   */
  const createProps = <T extends Record<string, unknown>>(baseProps: T) => {
    if (typeof text === 'string') {
      return Object.assign(baseProps, {
        innerHTML: true,
        children: text as string
      } as const)
    } 

    return Object.assign(baseProps, {
      innerHTML: false,
      children: renderTextArray(text)
    } as const)
  }

  const props = createProps({
    sizeCustom: "1.18rem",
    className: classNames("Paragraph", { "Paragraph--first": isFirst })
  })

  return (
    <Text {...props} />
  )
}