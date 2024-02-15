import { Link, LinkProps } from "@tanstack/react-router";
import classNames from "classnames";
import Text from "components/text";
import { bemBuilder } from "utilities/functions/bemBuilder";
import React from "react";

import './_Anchor.scss'

type TAnchor = React.FC<{ children: React.ReactNode, className?: string } & ({ href: string } | LinkProps)>;

/**
 * Application wide, standard Anchor component which can be used to link to internal or external pages.
 */
export const Anchor: TAnchor = ({ children, className, ...rest }) => {
    const [base, classGen] = bemBuilder('Anchor');

    const classes = {
        a: classNames(base, classGen('a'), className),
        link: classNames(base, classGen('link'), className)
    } as const;

    if ('href' in rest) {
        return (
            <a href={rest.href} className={classes.a} key={rest.href}>
                <Text span underline customColor="link">
                    {children}
                </Text>
            </a>
        )
    }

    if ('to' in rest && 'params' in rest) {
        return (
            <Link to={rest.to} params={rest.params} className={classes.link} key={rest.to}>
                <Text span underline customColor="link">
                    {children}
                </Text>
            </Link>
        )
    }

    return null;
}