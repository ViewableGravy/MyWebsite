
type TClampRaw = string | number | undefined;
type TClampTuple = [TClampRaw, TClampRaw, TClampRaw];

export type TClampParameters = TClampTuple | TClampRaw;
export type TClampReturnType<T extends TClampParameters> = T extends undefined ? undefined : `clamp(${string})`;

export const clamp = <T extends TClampParameters = undefined>(width?: T): TClampReturnType<T> => {
    switch (true) {
        case !width:
            return undefined as TClampReturnType<T>;
        case typeof width === 'string':
            return width as TClampReturnType<T>;
        case typeof width === 'number':
            return `${width}px` as TClampReturnType<T>;
        default:
            return `clamp(${width.map(clamp).join(', ')})` as TClampReturnType<T>;
    }
}