import { LinkProps } from "@tanstack/react-router";
import { TComponentProps } from "../componentConstructor";
import { Anchor as GlobalAnchor } from "components/Anchor";
import { router } from "router";

type TAnchor = React.FC<TComponentProps<'Anchor'>>;

const isValidRoute = (to: string | LinkProps['to']): to is LinkProps['to'] => {
    // @ts-ignore
    return !!router.matchRoute(to);
}

export const Anchor: TAnchor = ({ children, ...rest }) => {
    if ('to' in rest) {
        const { to } = rest;

        if (isValidRoute(to)) {
            const _rest = { ...rest, to: rest.to as LinkProps['to']  }
            return <GlobalAnchor {..._rest}>{children}</GlobalAnchor>
        }
        
        if (import.meta.env.DEV) {
            console.log(`The route ${rest.to} does not exist in the router`);
        }

        return <GlobalAnchor key="existn't" to="/" params>{children}</GlobalAnchor>;
    }

    if (!('to' in rest)) {
        return <GlobalAnchor {...rest}>{children}</GlobalAnchor>
    }

    const _rest = { ...rest, to: rest.to as LinkProps['to']  }

    return <GlobalAnchor {..._rest}>{children}</GlobalAnchor>

}