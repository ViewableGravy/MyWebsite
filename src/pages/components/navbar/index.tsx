import React, { useEffect } from "react";

import './_Navbar.scss';
import { bemBuilder } from "utilities/functions/bemBuilder";
import { useToggleState } from "hooks/useToggleState";
import { useMedia } from "hooks/useMedia";
import classNames from "classnames";

type THeader = React.FC<{ 
    children: React.ReactNode[],
    title: string,
    image: React.ReactNode,
    className?: string
}>

const _Header: THeader = ({ children, title, image, className }) => {
    const [{ open, closed }, toggle] = useToggleState(['open', 'closed']);
    const isMobile = useMedia(['xs', 'sm']);

    const [outer, classGenerator] = bemBuilder('Header');
    const classes = {
        outer: classNames(outer, className, {
          [classGenerator(undefined, 'mobile')]: isMobile,
          [classGenerator(undefined, 'open')]: open,
          [classGenerator(undefined, 'closed')]: closed,
        }),
        titleContainer: classNames(classGenerator('TitleContainer'), {
            [classGenerator('TitleContainer', 'mobile')]: isMobile,
            [classGenerator('TitleContainer', 'open')]: open,
            [classGenerator('TitleContainer', 'closed')]: closed,
        }),
        linksContainer: classGenerator('LinksContainer'),
        title: classGenerator('Title'),
        image: classGenerator('Image'),
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

    return (
        <div className={classes.outer}>
            <div className={classes.titleContainer}>
                <div className={classes.title}>{image}</div>
                <div className={classes.title}>{title}</div>
            </div>
            <div className={classes.linksContainer}>{children}</div>
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