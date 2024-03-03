
export type TCalcRaw = `${number}%` | `${number}v${'h' | 'w'}` | '-' | '+' | '*' | '/' | number | undefined;
type TCalcReturnType = string | number;
type TCalc = <const T extends TCalcRaw[]>(...args: T) => TCalcReturnType;

export const calc: TCalc = (...args) => {
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
    }, `calc(` as string) as TCalcReturnType;
}