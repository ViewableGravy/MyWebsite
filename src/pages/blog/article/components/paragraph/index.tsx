import classNames from "classnames"
import { ConstructComponent, type TComponentProps } from "../componentConstructor"

import './_Paragraph.scss'
import Text from "components/text"

type TParagraph = React.FC<TComponentProps<'Paragraph'>>

const renderTextArray = (text: TComponentProps<'Paragraph'>['text']) => {
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

export const Paragraph: TParagraph = ({ isFirst, text }) => {
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