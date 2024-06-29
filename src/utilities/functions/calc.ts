export const calc = (...args: Array<string | number>) => {
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
    }, `calc(` as string);
}