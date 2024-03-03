import classNames from "classnames";
import Text from "components/text";
import { useMedia } from "hooks/useMedia";
import { useAboutSectionContext } from ".";

type TContentPair = React.FC<{ heading: React.ReactNode, description: React.ReactNode }>;
export const _ContentPair: TContentPair = ({ heading, description }) => {
  /***** HOOKS *****/
  const { imageSide } = useAboutSectionContext();
  const isMobile = useMedia(['xs', 'sm']);
  const isTablet = useMedia(['md']);

  /***** LOGIC *****/
  const isLeft = imageSide === 'right';

  /***** CLASSES *****/
  const classes = {
    textContainer: classNames('AboutSection__container', {
      'AboutSection__description--right': !isLeft,
      'AboutSection__heading--left': isLeft
    }),
    heading: classNames('AboutSection__heading', {
      'AboutSection__heading--tablet': isTablet
    }),
    description: classNames('AboutSection__description', {
      'AboutSection__description--mobile': isMobile,
    })
  } as const;

  /***** RENDER *****/
  return (
    <div className={classes.textContainer}>
      <Text.Heading size-xl remove-margin level={2} className={classes.heading}>{heading}</Text.Heading>
      <div className={classes.description}>{description}</div>
    </div>
  )
}