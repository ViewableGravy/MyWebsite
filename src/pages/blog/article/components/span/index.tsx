import Text from "components/text"
import React from "react"
import { TComponentProps } from "../componentConstructor"

type TSpan = React.FC<TComponentProps<'Span'>>

export const Span: TSpan = ({ text }) => {
    return (
        <Text span>
            {text}
        </Text>
    )
}