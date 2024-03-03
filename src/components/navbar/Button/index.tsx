import Text from "components/text";
import { useRouter } from '@tanstack/react-router'
import cn from "classnames";
import { useHeader } from "../own";
import { bemBuilder } from "utilities/functions/bemBuilder";

export type TButtonProps = {
    children: React.ReactNode,
    activeRoute: string,
    onClick: () => void,
    className?: string,
    markNew?: boolean
}

export type TButton = React.FC<TButtonProps>

export const _HeaderButton: TButton = ({ children, onClick, activeRoute, className, markNew }) => {
    const { isSmall, isMobile } = useHeader();
    const { parseLocation } = useRouter();  
    
    const [, gcn] = bemBuilder('HeaderButton');
    const _className = cn("HeaderButton", className, {
        [gcn(undefined, 'active')]: parseLocation().pathname === activeRoute,
        [gcn(undefined, 'small')]: isSmall,
        [gcn(undefined, 'large')]: !isSmall,
        [gcn(undefined, 'mobile')]: isMobile,
        [gcn(undefined, 'new')]: markNew
    });

    const newTagClassName = cn(gcn("newTag"), { 
        [gcn("newTag", "mobile")]: isMobile 
    });

    return (
        <button className={_className} onClick={onClick}>
            <Text span remove-margin size-xs={isSmall || isMobile}>
                {markNew && (
                    <Text size-xs={isMobile || !isSmall} sizeCustom={isSmall ? 10 : undefined}>
                        <span className={newTagClassName}>New</span>
                    </Text>
                )}
                {children}
            </Text>
        </button>
    )
};