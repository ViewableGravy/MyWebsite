import React, {  useState } from "react";

import './_Navbar.scss';
import { bemBuilder } from "utilities/functions/bemBuilder";
import { useToggleState } from "hooks/useToggleState";
import { useMedia } from "hooks/useMedia";
import classNames from "classnames";
import Text from "components/text";
import { HeaderContext } from "./own";
import useThemedStyles from "functionality/styler";
import { BurgerToggle } from "./BurgerFancy";
import { _Button } from "./Button";
import { useEventListener } from "hooks/useEventListener";

type TClamp = [string | number, string | number, string | number];
type THeaderProps = {
    children: React.ReactNode[],
    title: string,
    image: React.ReactNode,
    className?: string,
    width?: TClamp | number | string | {
        desktop?: TClamp,
        mobile?: TClamp
    },
    hideAbove?: boolean
}

type THeader = React.FC<THeaderProps>

type TClampGeneric = TClamp | string | number | undefined;
type TClampReturnType<T extends TClampGeneric> = T extends undefined ? undefined : string;

const clamp = <T extends TClampGeneric = undefined>(width?: T): TClampReturnType<T> => {
    if (!width) return undefined as TClampReturnType<T>;
    if (typeof width === 'string') return width as TClampReturnType<T>;
    if (typeof width === 'number') return `${width}px` as TClampReturnType<T>;

    return `clamp(${width.map((w) => clamp(w)).join(', ')})` as TClampReturnType<T>;
}

const _Header: THeader = ({ children, title, image, className, width, hideAbove = true }) => {
    const [{ small, large }, toggle] = useToggleState(['large', 'small']);
    const { background } = useThemedStyles();
    const isMobile = useMedia(['xs', 'sm']);

    const [isOpen, setIsOpen] = useState(false);

    const [outer, gcn] = bemBuilder('Header');
    const classes = {
        wrapper: classNames(gcn("wrapper")),
        header: classNames(outer, className, background.header, {
          [gcn(undefined, 'mobile')]: isMobile,
          [gcn(undefined, 'small')]: small,
          [gcn(undefined, 'large')]: large,
          [gcn(undefined, 'hideAbove')]: hideAbove
        }),
        titleContainer: classNames(gcn('TitleContainer'), {
            [gcn('TitleContainer', 'mobile')]: isMobile,
            [gcn('TitleContainer', 'small')]: small,
            [gcn('TitleContainer', 'large')]: large,
        }),
        linksContainer: classNames(gcn('LinksContainer'), {
            [gcn('LinksContainer', 'large')]: large,
        }),
        title: gcn('Title'),
        image: gcn('Image'),
        hider: classNames(gcn('hider'), background.primary),
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
    Button: _Button,
});