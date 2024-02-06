import { Link, LinkProps } from "@tanstack/react-router";
import classNames from "classnames";
import Text from "components/text";
import { bemBuilder } from "helpers/functions/bemBuilder";
import React from "react";

type TAnchor = React.FC<{ children: React.ReactNode } & ({ href: string } | LinkProps)>;

/**
 * Application wide, standard Anchor component which can be used to link to internal or external pages.
 */
export const Anchor: TAnchor = ({ children, ...rest }) => {
    const [base, classGen] = bemBuilder('Anchor');

    const classes = {
        a: classNames(base, classGen('a')),
        link: classNames(base, classGen('link'))
    } as const;

    if ('href' in rest) {
        return (
            <a href={rest.href} className={classes.a} key={rest.href}>
                <Text span underline>
                    {children}
                </Text>
            </a>
        )
    }

    if ('to' in rest && 'params' in rest) {
        return (
            <Link to={rest.to} params={rest.params} className={classes.link} key={rest.to}>
                <Text span underline>
                    {children}
                </Text>
            </Link>
        )
    }

    return null;
}