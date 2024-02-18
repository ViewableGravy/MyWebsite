import Text from "components/text";
import { useRouter } from '@tanstack/react-router'
import classNames from "classnames";
import { useHeader } from "../own";

type TButton = React.FC<{
    children: React.ReactNode,
    activeRoute: string,
    onClick: () => void
}>

export const _Button: TButton = ({ children, onClick, activeRoute }) => {
    const { isOpen } = useHeader();
    const { parseLocation } = useRouter();    
    const className = classNames("HeaderButton", {
        "HeaderButton--active": parseLocation().pathname === activeRoute,
        "HeaderButton--open": isOpen,
        "HeaderButton--closed": !isOpen
    });

    return (
        <button className={className} onClick={onClick}>
            <Text span remove-margin size-xs={isOpen}>
                {children}
            </Text>
        </button>
    )
};