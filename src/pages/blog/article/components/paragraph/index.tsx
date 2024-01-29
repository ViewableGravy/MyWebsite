import type { TComponentProps } from "../componentConstructor"

type TParagraph = React.FC<TComponentProps<'Paragraph'>>

export const Paragraph: TParagraph = ({ text }) => (
  <p className="blog-article content paragraph" dangerouslySetInnerHTML={{ __html: text }} />
)