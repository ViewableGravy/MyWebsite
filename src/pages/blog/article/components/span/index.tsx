import Text from "components/utility/text"
import React from "react"
import { TComponentProps } from "../componentConstructor"

type TSpan = React.FC<TComponentProps<'Span'>>

export const Span: TSpan = ({ children }) => {
    return (
        <Text span>
            {children}
        </Text>
    )
}