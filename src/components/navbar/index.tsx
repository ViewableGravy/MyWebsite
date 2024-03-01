import React, {  useState } from "react";

import './_Navbar.scss';
import { bemBuilder } from "utilities/functions/bemBuilder";
import { useToggleState, useToggleState2 } from "hooks/useToggleState";
import { useMedia } from "hooks/useMedia";
import cn from "classnames";
import Text from "components/text";
import { HeaderContext } from "./own";
import useThemedStyles from "functionality/styler";
import { BurgerToggle } from "./BurgerFancy";
import { _HeaderButton } from "./Button";
import { useEventListener } from "hooks/useEventListener";
import { TClampParameters, clamp } from "utilities/functions/clamp";
import { usePreconfiguredButtons } from "./useBaseHeaderButtons";
import { useHeaderProps } from "./useBaseHeaderProps";
import { FlipToggle } from "pages/blog/menu/toggle/toggle";

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
    // const [{ small, large }, toggle] = useToggleState(['large', 'small']);
    const [{ small, large }, toggle] = useToggleState2(['large', 'small'], { objectValues: true });
    const { background } = useThemedStyles();
    const isMobile = useMedia(['xs', 'sm']);
    const isMini = useMedia(['xs']);

    const [isOpen, setIsOpen] = useState(false);

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

    useEventListener('scroll', () => {
        window.scrollY > 50 ? toggle('small') : toggle('large');
    }, undefined)

    const getWidth = () => {
        if (typeof width === 'object' && !Array.isArray(width)) {
            return isMobile ? clamp(width?.mobile) : clamp(width?.desktop);
        }

        return clamp(width);
    }

    const context = {
        isSmall: small,
        isMobile
    }

    return (
        <HeaderContext.Provider value={context}>
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

                    {!isMobile && (
                        <div className={classes.linksContainer}>
                            {children}
                        </div>
                    )}

                    {isMobile && (
                        <BurgerToggle active={isOpen} setActive={setIsOpen} />
                    )}
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