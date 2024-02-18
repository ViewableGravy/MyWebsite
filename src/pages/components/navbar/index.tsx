import React, { useEffect } from "react";

import './_Navbar.scss';
import { bemBuilder } from "utilities/functions/bemBuilder";
import { useToggleState } from "hooks/useToggleState";
import { useMedia } from "hooks/useMedia";
import classNames from "classnames";
import Text from "components/text";
import { HeaderContext } from "./own";
import useThemedStyles from "functionality/styler";

type TClamp = [string, string, string];
type THeaderProps = {
    children: React.ReactNode[],
    title: string,
    image: React.ReactNode,
    className?: string,
    width?: TClamp | string | {
        desktop?: TClamp,
        mobile?: TClamp
    },
    hideAbove?: boolean
}

type THeader = React.FC<THeaderProps>

type TClampGeneric = TClamp | string | undefined;
type TClampReturnType<T extends TClampGeneric> = T extends undefined ? undefined : string;

const clamp = <T extends TClampGeneric = undefined>(width?: T): TClampReturnType<T> => {
    if (!width) return undefined as TClampReturnType<T>;
    if (typeof width === 'string') return width as TClampReturnType<T>;
    
    return `clamp(${width.join(', ')})` as TClampReturnType<T>;
}

const _Header: THeader = ({ children, title, image, className, width, hideAbove = true }) => {
    const [{ open, closed }, toggle] = useToggleState(['open', 'closed']);
    const { background } = useThemedStyles();
    const isMobile = useMedia(['xs', 'sm']);

    const [outer, classGenerator] = bemBuilder('Header');
    const classes = {
        wrapper: classNames(classGenerator("wrapper")),
        header: classNames(outer, className, background.header, {
          [classGenerator(undefined, 'mobile')]: isMobile,
          [classGenerator(undefined, 'open')]: open,
          [classGenerator(undefined, 'closed')]: closed,
          [classGenerator(undefined, 'hideAbove')]: hideAbove
        }),
        titleContainer: classNames(classGenerator('TitleContainer'), {
            [classGenerator('TitleContainer', 'mobile')]: isMobile,
            [classGenerator('TitleContainer', 'open')]: open,
            [classGenerator('TitleContainer', 'closed')]: closed,
        }),
        linksContainer: classNames(classGenerator('LinksContainer'), {
            [classGenerator('LinksContainer', 'closed')]: closed,
        }),
        title: classGenerator('Title'),
        image: classGenerator('Image'),
        hider: classNames(classGenerator('hider'), background.primary)
    }

    // this will probably be a performance issue, abstract and use a ref
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50)
                return toggle('closed');
            
            toggle('open');
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    const getWidth = () => {
        if (typeof width === 'string') return width;
        if (Array.isArray(width)) return clamp(width);
        if (isMobile) return clamp(width?.mobile);
        if (!isMobile) return clamp(width?.desktop);
        return undefined;
    }


    const context = {
        isOpen: open,
        isMobile
    }

    return (
        <div style={{ width: getWidth() }} className={classes.wrapper}>
            <div className={classes.hider} />
            <div className={classes.header}>
                <HeaderContext.Provider value={context}>
                    <div className={classes.titleContainer}>
                        <div className="Header__TitleContainerInner">
                            <div className={classes.image}>
                                {image}
                            </div>
                            <div className={classes.title}>
                                <Text remove-margin size-xxl={open} size-md={closed} bold>{title}</Text>
                            </div>
                        </div>
                    </div>
                    <div className={classes.linksContainer}>{children}</div>
                </HeaderContext.Provider>
            </div>
        </div>
    )
}

export const Header = Object.assign(_Header, {
    Button: React.lazy(() => 
        import('./Button').then(module => ({ 
            default: module._Button 
        }))
    ),
});