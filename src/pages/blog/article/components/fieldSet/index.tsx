import type { TComponentProps } from "../componentConstructor";

type TOwnFieldset = React.FC<TComponentProps<'Fieldset'>>

export const Fieldset: TOwnFieldset = ({ legend, content, color = '#d6a21a'}) => {
  if (!content?.length) return null;

  return (
    <fieldset className={'blog-article content fieldset'} style={{ borderColor: color }}>
      <legend className={'blog-article content legend'} style={{ color: color }}>{legend}</legend>
      <p className={'body'} dangerouslySetInnerHTML={{ __html: content }}></p>
    </fieldset>
  )
}