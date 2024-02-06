import { LinkProps } from "@tanstack/react-router";
import { TComponentProps } from "../componentConstructor";
import { Anchor as GlobalAnchor } from "components/Anchor";
import { router } from "router";

type TAnchor = React.FC<TComponentProps<'Anchor'>>;

export const Anchor: TAnchor = ({ text, ...rest }) => {
    if ('to' in rest) {
        const matched = router.matchRoute(rest.to);
        
        if (!matched) {
            if (import.meta.env.DEV) {
                console.log(`The route ${rest.to} does not exist in the router`);
            }
            return null;
        }
    }

    if (!('to' in rest)) {
        return <GlobalAnchor {...rest}>{text}</GlobalAnchor>
    }

    const _rest = { ...rest, to: rest.to as LinkProps['to']  }

    return <GlobalAnchor {..._rest}>{text}</GlobalAnchor>

}