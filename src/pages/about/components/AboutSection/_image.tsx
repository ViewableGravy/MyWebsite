import { useMedia } from "hooks/useMedia";
import { useAboutSectionContext } from ".";
import classNames from "classnames";
import { useId, useMemo } from "react";
import { bemBuilder } from "helpers/functions/bemBuilder";

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

const useClassIdentifier = <T extends string>(baseClass: T) => {
    const id = useMemo(() => Math.random().toString(36).substring(7), []);

    return `${baseClass}--${id}` as const;
}

export const _Image: TImage = ({ className, offset, ...props }) => {
  const [base, classGen] = bemBuilder('AboutSection__imageContainer');
  const { imageSide } = useAboutSectionContext();
  const isMobile = useMedia(['xs', 'sm']);
  const classIdentifier = useClassIdentifier(base);

  const isLeft = imageSide === 'left';

  const classes = {
    imageContainer: classNames(base, {
      [classGen(undefined, 'mobile')]: isMobile,
      [classGen(undefined, 'right')]: !isLeft,
      [classGen(undefined, 'left')]: isLeft,
      [classIdentifier]: true
    }, className),
    image: 'AboutSection__image'
  }

  const _styles = {
    isMobile: (
        `.${classIdentifier}.AboutSection__imageContainer--mobile {
            right: ${20 - (offset?.right || 0) + (offset?.left || 0)}px;
            top: ${-35 + (offset?.down || 0) - (offset?.up || 0)}px;
        }`
    ),
    isRight: (
        `.${classIdentifier}.AboutSection__imageContainer--right {
            margin-top: ${-60 + (offset?.down || 0) - (offset?.up || 0)}px;
            margin-right: ${-20 - (offset?.right || 0) + (offset?.left || 0)}px;
        }`
    ),
    isLeft: (
        `.${classIdentifier}.AboutSection__imageContainer--left {
            margin-top: ${-60 + (offset?.down || 0) - (offset?.up || 0)}px;
            margin-left: ${-20 - (offset?.left || 0) + (offset?.right || 0)}px;
        }`
    )
  }

  const styles = {
    right: (
      <style>
        {_styles.isMobile}
        {!isMobile && _styles.isRight}
      </style>
    ),
    left: (
      <style>
        {_styles.isMobile}
        {!isMobile && _styles.isLeft}
      </style>
    )
  }

  return (
    <div className={classes.imageContainer}>
      {'children' in props ? props.children : <img className={classes.image} {...props} />}

      {styles[imageSide]}
    </div>
  )
}