import type { TComponentProps } from "../componentConstructor"

import './_Paragraph.scss'

type TParagraph = React.FC<TComponentProps<'Paragraph'>>

export const Paragraph: TParagraph = ({ text }) => (
  <p className="Paragraph" dangerouslySetInnerHTML={{ __html: text }} />
)