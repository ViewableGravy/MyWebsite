import React from "react"

type TParagraph = React.FC<{ text: string }>

export const Paragraph: TParagraph = ({ text }) => (
  <p className="blog-article content paragraph" dangerouslySetInnerHTML={{ __html: text }} />
)