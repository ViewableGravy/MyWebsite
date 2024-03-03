/**
 * BEM builder function
 * 
 * The bemBuilder function is a helper function that allows you to create a BEM (Block Element Modifier) class name by providing the
 * component name and then using the returned "base" (component name) and "generator" (function) to create the class name.
 * 
 * This is typed correctly and will properly infer the narrowest type possible given the inputs.
 */
export const bemBuilder = <T extends string>(component: T) => {
    type Generic = string | undefined;
    type ReturnType<A extends Generic, B extends Generic> = `${T}${A extends undefined ? '' : `__${A}`}${B extends undefined ? '' : `--${B}`}`;

    const generator = <GElement extends Generic = undefined, GModifier extends Generic = undefined>(element: GElement, modifier?: GModifier) => {
        return `${component}${element ? `__${element}` : ''}${modifier ? `--${modifier}` : ''}` as ReturnType<GElement, GModifier>;
    }

    return [
        component,
        generator
    ] as const;
}