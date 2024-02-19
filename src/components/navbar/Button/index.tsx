import Text from "components/text";
import { useRouter } from '@tanstack/react-router'
import cn from "classnames";
import { useHeader } from "../own";
import { bemBuilder } from "utilities/functions/bemBuilder";

type TButton = React.FC<{
    children: React.ReactNode,
    activeRoute: string,
    onClick: () => void
}>

export const _Button: TButton = ({ children, onClick, activeRoute }) => {
    const { isSmall, isMobile } = useHeader();
    const { parseLocation } = useRouter();  
    
    const [, gcn] = bemBuilder('HeaderButton');
    const className = cn("HeaderButton", {
        [gcn(undefined, 'active')]: parseLocation().pathname === activeRoute,
        [gcn(undefined, 'small')]: isSmall,
        [gcn(undefined, 'large')]: !isSmall,
        [gcn(undefined, 'mobile')]: isMobile
    });

    return (
        <button className={className} onClick={onClick}>
            <Text span remove-margin size-xs={isSmall || isMobile}>
                {children}
            </Text>
        </button>
    )
};