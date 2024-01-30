import classNames from "classnames"
import type { TComponentProps } from "../componentConstructor"

import './_Paragraph.scss'

type TParagraph = React.FC<TComponentProps<'Paragraph'>>

export const Paragraph: TParagraph = ({ text, isFirst }) => (
  <p className={classNames("Paragraph", { "Paragraph--first": isFirst })} dangerouslySetInnerHTML={{ __html: text }} />
)