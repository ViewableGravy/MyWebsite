import { TComponentProps } from "../componentConstructor";

type TAnchor = React.FC<TComponentProps<'Anchor'>>;

export const Anchor: TAnchor = ({ text, to }) => {
    return (
        <a href={to}>{text}</a>
    )
}