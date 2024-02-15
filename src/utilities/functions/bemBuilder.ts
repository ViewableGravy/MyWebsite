/**
 * BEM builder function
 * 
 * The bemBuilder function is a helper function that allows you to create a BEM (Block Element Modifier) class name by providing the
 * component name and then using the returned "base" (component name) and "generator" (function) to create the class name.
 * 
 * This is typed correctly and will properly infer the narrowest type possible given the inputs.
 */
export const bemBuilder = <T extends string>(component: T) => {
    const generator = (
        <GElement extends string | undefined = undefined, GModifier extends string | undefined = undefined>
        (element: GElement, modifier?: GModifier): 
        `${T}${GElement extends undefined ? '' : `__${GElement}`}${GModifier extends undefined ? '' : `--${GModifier}`}` => 
        `${component}${element ? `__${element}` : ''}${modifier ? `--${modifier}` : ''}` as any
    )

    return [
        component,
        generator
    ] as const;
}