
type TCalcRaw = `${number}%` | `${number}v${'h' | 'w'}` | number | undefined;
type TCalcReturnType<T extends TCalcRaw[]> = string | number;
type TCalc = <T extends TCalcRaw[]>(...args: T) => TCalcReturnType<T>;

export const calc: TCalc = <T extends TCalcRaw[]>(...args: T) => {
    return args.reduce((acc, curr, i, arr) => {
        const isLast = i === arr.length - 1;
        const combine = () => {
            switch (true) {
                case typeof curr === 'number':
                    return `${acc} ${curr}px`;
                case typeof curr === 'string':
                    return `${acc} ${curr}`;
                default:
                    return acc;
            }
        }

        return isLast ? `${combine()})` : combine();
    }, `calc(` as string) as TCalcReturnType<T>;
}