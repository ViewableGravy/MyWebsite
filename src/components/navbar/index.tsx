import React, {  useState } from "react";

import './_Navbar.scss';
import { bemBuilder } from "utilities/functions/bemBuilder";
import { useToggleState } from "hooks/useToggleState";
import { useMedia } from "hooks/useMedia";
import cn from "classnames";
import Text from "components/utility/text";
import { HeaderContext } from "./own";
import useThemedClasses from "functionality/styler/useThemedClasses";
import { BurgerToggle } from "./BurgerFancy";
import { _HeaderButton } from "./Button";
import { useEventListener } from "hooks/useEventListener";
import { TClampParameters, clamp } from "utilities/functions/clamp";
import { usePreconfiguredButtons } from "./useBaseHeaderButtons";
import { useHeaderProps } from "./useBaseHeaderProps";
import { ConditionalRender } from "../conditionalRender/turneryRender";

export type THeaderProps = {
    children: React.ReactNode,
    title: string,
    image: React.ReactNode,
    className?: string,
    width?: TClampParameters | {
        desktop?: TClampParameters,
        mobile?: TClampParameters
    },
    hideAbove?: boolean,
    /**
     * This can be used to insert an element along the top row next to the title. Commonly used for a narrow button
     * such as the ToggleButton Component
     */
    titleMore?: React.ReactNode
}

type THeader = React.FC<THeaderProps>

const _Header: THeader = ({ children, title, titleMore, image, className, width, hideAbove = true }) => {
    /***** STATE *****/
    const [isOpen, setIsOpen] = useState(false);

    /***** HOOKS *****/
    const [{ small, large }, toggle] = useToggleState(['large', 'small'], { objectValues: true });
    const { background } = useThemedClasses();
    const isMobile = useMedia(['xs', 'sm']);
    const isMini = useMedia(['xs']);

    useEventListener('scroll', () => {
        window.scrollY > 50 ? toggle('small') : toggle('large');
    });

    /***** RENDER HELPERS *****/
    const [outer, gcn] = bemBuilder('Header');
    const classes = {
        wrapper: cn(gcn("wrapper")),
        header: cn(outer, className, background.header, {
          [gcn(undefined, 'mobile')]: isMobile,
          [gcn(undefined, 'small')]: small,
          [gcn(undefined, 'large')]: large,
          [gcn(undefined, 'hideAbove')]: hideAbove
        }),
        titleContainer: cn(gcn('TitleContainer'), {
            [gcn('TitleContainer', 'mobile')]: isMobile,
            [gcn('TitleContainer', 'small')]: small,
            [gcn('TitleContainer', 'large')]: large,
        }),
        linksContainer: cn(gcn('LinksContainer'), {
            [gcn('LinksContainer', 'large')]: large,
            [gcn('LinksContainer', 'small')]: small,
        }),
        title: gcn('Title'),
        image: gcn('Image'),
        hider: cn(gcn('hider'), background.primary),
        dropdown: gcn('dropdown'),
        dropdownInner: gcn('dropdownInner')
    }

    /***** FUNCTIONS *****/
    const getWidth = () => {
        if (typeof width === 'object' && !Array.isArray(width)) {
            return isMobile ? clamp(width?.mobile) : clamp(width?.desktop);
        }

        return clamp(width);
    }

    /***** RENDER *****/
    return (
        <HeaderContext.Provider value={{ isSmall: small, isMobile }}>
            <div style={{ width: getWidth() }} className={classes.wrapper}>
                <div className={classes.hider} />
                <div className={classes.header}>
                    <div className={classes.titleContainer}>
                        <div className="Header__TitleContainerInner">
                            <div className={classes.image}>
                                {image}
                            </div>
                            <div className={classes.title}>
                                <Text remove-margin bold size-xxl={small} size-md={large}>
                                    {title}
                                </Text>
                            </div>

                            {!isMini && titleMore}
                        </div>
                    </div>

                    <ConditionalRender condition={!isMobile} onFalse={<BurgerToggle active={isOpen} setActive={setIsOpen} />}>
                        <div className={classes.linksContainer}>
                            {children}
                        </div>
                    </ConditionalRender>
                </div>

                {/* Mobile Dropdown */}
                {isMobile && isOpen && (
                    <div className={classes.dropdown}>
                        <Text white bold size-lg align-center remove-margin>Links</Text>
                        <div className={classes.dropdownInner}>
                            {children}
                        </div>
                    </div>
                )}
            </div>
        </HeaderContext.Provider>
    )
}

export const Header = Object.assign(_Header, {
    Button: _HeaderButton,
    usePreconfiguredButtons,
    useHeaderProps
});