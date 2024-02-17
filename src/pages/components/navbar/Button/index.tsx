import Text from "components/text";

type TButton = React.FC<{
    children: React.ReactNode,
    onClick: () => void
}>

export const _Button: TButton = ({ children, onClick }) => {
    const className = "HeaderButton"

    return (
        <button className={className} onClick={onClick}>
            <Text span>
                {children}
            </Text>
        </button>
    )
};