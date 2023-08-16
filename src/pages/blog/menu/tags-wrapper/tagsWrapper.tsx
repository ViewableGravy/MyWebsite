import React, { useState, useRef }from 'react';
import { Link } from 'react-router-dom';
import { useMedia } from "hooks/useMedia/index";
import { TTag } from '../posts/types';
import './tagsWrapper.scoped.scss';

//todo - add toggle (+) on left to toggle between on and off rather than just clicking the text
//on mobile this can be hidden and just clicking on an option while closed will toggle the state on (and show a minus to close)

type props = {
  data: TTag[],
}

type TTagMenu = React.FC<props>;

export const TagMenu: TTagMenu = ({ data }) => {
  /****** hooks ******/
  const media = useMedia();

  /****** state ******/
  const [clearTimer, setClearTimer] = useState<NodeJS.Timeout | null>(null);
  const tags = useRef<HTMLElement[]>([]); //dunno why I made this a ref instead of state
  const innerContainer = useRef<HTMLDivElement>(null);

  /****** functions ******/
  const onReset = () => {
    if (!tags?.current) return;
    if (!innerContainer.current) return;
    if (tags.current.length === 0) return;

    //reset innerContainer width
    innerContainer.current.style.position = ['xs'].includes(media)
      ? 'relative'
      : 'absolute';
    innerContainer.current.style.width = 'null';

    //reset front tag to default width
    const front = tags.current[tags.current.length - 1];
    front.style.width = 'null';

    //reset all tags to default position and widths based on front
    tags.current.forEach((tag, index) => {
      tag.style.right = ['xs'].includes(media) ? '' : `${index * 10}px`;
      tag.style.zIndex = `${index}`;
      tag.style.color = tag.dataset.color || 'white';
      if (tag.style.width) tag.style.width = front.getBoundingClientRect().width + 'px';
      if (tag !== front && !['xs', 'sm'].includes(media)) tag.style.color = 'transparent';
    });
  };

  const mouseOver = () => {
    if (clearTimer) clearTimeout(clearTimer);

    if (['xs', 'sm'].includes(media)) return;
    if (!tags.current) return;
    if (!innerContainer.current) return;

    tags.current.forEach(({ style }) => {
      style.width = ``;
    });

    const widths = tags.current.map((tag) => tag.offsetWidth);

    tags.current.forEach(({ style, dataset }, index) => {
      //culmination of widths before this one
      const totalWidth = widths.slice(0, index).reduce((a, b) => a + b + 10, 0);

      //how far to the right
      style.right = `${totalWidth}px`;
      style.zIndex = "1";
      style.color = dataset.color || 'white';
    });
    
    innerContainer.current.style.width = `${widths.reduce((a, b) => a + b + 10, 0)}px`;
  };

  const mouseLeave = () => {
    const timeout = setTimeout(() => {
      onReset();
    }, 750);

    setClearTimer(timeout);
  };

  const onClick = () => {
    return null;
  }

  /****** effects ******/
  React.useEffect(onReset, [tags.current, media])

  /****** render ******/
  return (
    <div className={'tags'}>
      <div 
        className={'tags-inner'} 
        ref={innerContainer} 
        onMouseEnter={mouseOver} 
        onMouseLeave={mouseLeave}
        onClick={onClick}
      >
        {
          data.map((tag, index) => 
            <GenerateTag 
              key={index}
              className={''}
              color={tag.color}
              text={tag.name}
              ref={(ref: HTMLElement) => tags.current[index] = ref}
              onClick={onClick}
            />
          )
        }
      </div>
    </div>
  )
};

const isDarkColor = (color: string) => {

  if (color[0] === '#') {
    const c = color.substring(1);      // strip #
    const rgb = parseInt(c, 16);   // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >> 8) & 0xff;  // extract green
    const b = (rgb >> 0) & 0xff;  // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma < 80;
  }

  if (color[0] === 'r') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [r, g, b] = color.substring(4, color.length - 1).replace(/ /g, '').split(',') as any;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma < 80;
  }

  return true;
}

type TGenerateTag = {
  color: string,
  text: string,
  className: string,
  onClick: any,
}

export const GenerateTag = React.forwardRef(({ color, text, className, onClick }: TGenerateTag, ref: any) => {
  if (!color) color = '#e008ce'; //black

  const properties = {
    to: '/',
    style: { 
      touchAction: 'pan-x',
      backgroundColor: color,
      color: '#000000',
    },
    className: `${className} tag`,
    'data-color': isDarkColor(color) ? '#f1f1f1' : '#000000',
    ref,
  } as any;
  
  if (onClick) properties.onClick = onClick;

  return (
    <Link {...properties}>
      <span>{text}</span>
    </Link>
  )
});

export default TagMenu;
