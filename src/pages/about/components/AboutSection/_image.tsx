import { useMedia } from "hooks/useMedia";
import { useAboutSectionContext } from ".";
import classNames from "classnames";
import { CSSProperties, useMemo } from "react";
import { bemBuilder } from "helpers/functions/bemBuilder";
import { Style, chainSelectors, styleBuilder } from "./helpers";
import { string } from "zod";

type TChildrenOrProps = { src: string , alt: string } | { children: React.ReactNode };
type TImage = React.FC<{ 
    className?: string, 
    offset?: {
      right?: number | false, 
      down?: number | false,
      up?: number | false
      left?: number | false
    } 
} & TChildrenOrProps>;

const useClassIdentifier = <T extends string, G extends string | undefined = undefined>(baseClass: T, manualId?: G) => {
    const id = useMemo(() => Math.random().toString(36).substring(7), []);

    const className = `${baseClass}--${manualId ?? id}` as `${T}--${G extends undefined ? typeof id : G}`;
    const selector = `.${className}` as `.${T}--${G extends undefined ? typeof id : G}`;

    return [className, selector] as const;
}

export const _Image: TImage = ({ className, offset, ...props }) => {
  const [base, classGen] = bemBuilder('AboutSection__imageContainer');
  const [_className] = useClassIdentifier(base);
  const { imageSide } = useAboutSectionContext();
  const isMobile = useMedia(['xs', 'sm']);
  const isLeft = imageSide === 'left';

  const allClasses = {
    mobile: classGen(undefined, 'mobile'),
    right: classGen(undefined, 'right'),
    left: classGen(undefined, 'left'),
  }

  const classes = {
    imageContainer: classNames(base, {
      [allClasses.mobile]: isMobile,
      [allClasses.right]: !isLeft,
      [allClasses.left]: isLeft,
      [_className]: true
    }, className),
    image: 'AboutSection__image'
  }

  const mobileSelector = chainSelectors([_className, allClasses.mobile] as const, '.');
  const rightSelector = chainSelectors([_className, allClasses.right] as const, '.');
  const leftSelector = chainSelectors([_className, allClasses.left] as const, '.');

  const styles = {
    mobile: styleBuilder(mobileSelector, {
      right: `${20 - (offset?.right || 0) + (offset?.left || 0)}px`,
      top: `${-35 + (offset?.down || 0) - (offset?.up || 0)}px`
    }),
    right: styleBuilder(rightSelector, {
      marginTop: `${-60 + (offset?.down || 0) - (offset?.up || 0)}px`,
      marginRight: `${-20 - (offset?.right || 0) + (offset?.left || 0)}px`
    }),
    left: styleBuilder(leftSelector, {
      marginTop: `${-60 + (offset?.down || 0) - (offset?.up || 0)}px`,
      marginLeft: `${-20 - (offset?.left || 0) + (offset?.right || 0)}px`,
    })
  };

  return (
    <div className={classes.imageContainer}>
      {'children' in props ? props.children : <img className={classes.image} {...props} />}

      <Style 
        styles={{
          [styles.mobile]: isMobile,
          [styles.right]: !isMobile && !isLeft,
          [styles.left]: !isMobile && isLeft
        }} 
      />
    </div>
  )
}