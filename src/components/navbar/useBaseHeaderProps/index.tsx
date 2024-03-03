/***** CONSTS *****/
import logo from 'assets/images/lucidchartLogo.png';

/***** UTILITIES *****/
import { calc } from 'utilities/functions/calc';
import { usePreconfiguredButtons } from '../useBaseHeaderButtons';

/***** TYPE IMPORTS *****/
import { type THeaderProps } from '..';

/***** TYPE DEFINITIONS *****/
type TUseHeader = (props?: Partial<THeaderProps>) => THeaderProps;

/***** HOOK START *****/
export const useHeaderProps: TUseHeader = (props) => {
    /***** HOOKS *****/
    const [Buttons] = usePreconfiguredButtons({ asArray: true });

    /***** RENDER *****/
    return {
        title: "ViewableGravy",
        image: <img src={logo} alt="logo" />,
        width: {
            desktop: [230, calc('100%', '-', 90), calc(800, '-', 50)],
            mobile: [230, calc('100%', '-', 50), calc(800, '-', 50)]
        },
        children: <Buttons />,
        ...props
    } as const;
}