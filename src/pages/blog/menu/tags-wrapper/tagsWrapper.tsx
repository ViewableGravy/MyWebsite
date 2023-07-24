import React, { useState, useRef }from 'react';
import { Link } from 'react-router-dom';
import { useMedia } from '../../../../functionality/helper';
import { TTag } from '../posts/types';
import './tagsWrapper.scoped.scss';

//todo - add toggle (+) on left to toggle between on and off rather than just clicking the text
//on mobile this can be hidden and just clicking on an option while closed will toggle the state on (and show a minus to close)

type props = {
  data: TTag[],
}

export const TagMenu = ({ data }: props): JSX.Element => {
  const [clearTimer, setClearTimer] = useState<NodeJS.Timeout | null>(null);
  const tags = useRef<HTMLElement[]>([]); //dunno why I made this a ref instead of state
  const innerContainer = useRef<HTMLDivElement>(null);

  const media = useMedia();

  const onReset = () => {
    if (!tags?.current) return;
    if (!innerContainer.current) return;
    if (tags.current.length === 0) return;

    //reset innerContainer width
    if (['xs', 'sm'].includes(media)) innerContainer.current.style.position = 'relative';
    innerContainer.current.style.width = 'null';

    //reset front tag to default width
    const front = tags.current[tags.current.length - 1];
    front.style.width = 'null';

    //reset all tags to default position and widths based on front
    tags.current.forEach((tag, index) => {
      tag.style.right = ['xs', 'sm'].includes(media) ? '' : `${index * 10}px`;
      tag.style.zIndex = `${index}`;
      tag.style.color = tag.dataset.color || 'white';
      if (tag.style.width) tag.style.width = front.getBoundingClientRect().width + 'px';
      if (tag !== front && !['xs', 'sm'].includes(media)) tag.style.color = 'transparent';
    });
  };

  const onSwipe = (direction: 'right' | 'left' = 'left') => {
    if (!tags?.current) return;

    if (direction === 'left') {
      tags.current.splice(0, 0, tags.current.splice(tags.current.length - 1, 1)[0]);
    } else {
      tags.current.splice(tags.current.length - 1, 0, tags.current.splice(0, 1)[0]);
    }

    onReset();
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

  React.useEffect(onReset, [tags.current, media])

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


// export const TagMenu = ({ tagDetails, parentKey }) => {
//   const [wWidth,] = useWindowDimensions();
//   let   [tags, setTags] = useState([]);
//   const [state,] = useGlobalState();
//   const [, setIsHidden] = useState(true);

//   const outerContainer = createRef();
//   const innerContainer = createRef();
//   const clearTimer = useRef();
  
//   const mouseOver = () => {
//     if (clearTimer.current)
//       clearTimeout(clearTimer.current);

//     innerContainerHoverDesktop();
//     setIsHidden(false);
//   }

//   const mouseLeave = () => {
//     setIsHidden(true);
//     if (wWidth >= 576) {
//       clearTimer.current = setTimeout(() => {
//         tagDefault();
//         resetInnerContainerWidth();
//       }, 750);
//     }
//   }

//   const incrementTags = () => tags = tags.map(({ tag, index }) => ({ tag: tag, index: ++index >= tags.length ? 0 : index }));
//   const decrementTags = () => tags = tags.map(({ tag, index }) => ({ tag: tag, index: --index < 0 ? tags.length - 1 : index }));
//   const getFrontTag = () => tags.find(({ index }) => index + 1 === tags.length);
//   const getTagFromEvent = (e) => tags.find(({ tag }) => tag.current === e.target);
//   const isFrontTag = (tag) => tag.index + 1 === tags.length;
//   const indexesFromFrontTag = (tag) => getFrontTag().index - tag.index;
//   const resetTagsStyling = () => tags?.forEach(({ tag }) => {
//     if (tag.current?.style) {
//       tag.current.style.width = null;
//       tag.current.style.color = null;
//       tag.current.style.zIndex = null;
//       tag.current.style.right = null;
//     }
//   });

//   const mapTagDetailsToTags = (tags) => tags ? tags.map((_, index) => ({ tag: createRef(), index, details: tagDetails[index] })) : [];
//   const addDraftTag = (ts) => [...ts, { tag: createRef(), index: tags.length, details: 'New Tag', draft: true }]


//   const swipeHandlers = useSwipeable({
//     onSwipedRight: () => rotateTags(-1),
//     onSwipedLeft: () => rotateTags(1),
//     delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
//     preventDefaultTouchmoveEvent: true,  // call e.preventDefault *See Details*
//     trackTouch: true,                     // track touch input
//     trackMouse: false,                    // track mouse input
//   })

//   //Used to handle hovering over tags on desktop (Should resize and reposition them approriately)
//   const innerContainerHoverDesktop = () => {
//     if (wWidth > 576) {
//       const widths = tags.map(({ tag }) => tag.current.offsetWidth);

//       tags.forEach(({ tag }, index) => {
//         //culmination of widths before this one
//         const totalWidth = widths.slice(0, index).reduce((a, b) => a + b + 10, 0);

//         //how far to the right
//         tag.current.style.right = `${totalWidth}px`;
//       });

//       innerContainer.current.style.width = `${widths.reduce((a, b) => a + b + 10, 0)}px`;
//     }
//   }

//   const resetInnerContainerWidth = () => {
//     document.querySelectorAll('.tags-inner').forEach((tag) => {
//       tag.style.width = null;
//     });
//   }


//   const rotateTags = (increment) => {
//     if (wWidth < 576 && wWidth > 380) {
//       if (!increment)
//         incrementTags()
//       else
//         for (let i = 0; i < Math.abs(increment); i++)
//           increment < 0 ? decrementTags(tags) : incrementTags(tags);

//       const front = getFrontTag(tags);

//       front.tag.current.style.width = null;
//       front.tag.current.style.color = null;

//       tags?.forEach(({ tag, index }) => {

//         tag.current.style.right = `${index * 10}px`
//         tag.current.style.zIndex = index;

//         if (front.index === index) {
//           tag.current.style.width = null;
//         } else {
//           tag.current.style.width = `${front.tag.current.offsetWidth - 8 - 8 - 10}px`;
//           tag.current.style.color = 'transparent';
//         }
//       });
//     }
//   }

//   const tagDefault = () => {
//     resetTagsStyling();

//     tags?.forEach(({ tag, index }) => {
//       // only apply this styling on normal mobile and desktop (not tiny mobile)
//       if (tag.current && wWidth > 380) {
//         tag.current.style.right = `${index * 10}px`;
//         tag.current.style.zIndex = index;
//       }
//     })
//   }

//   //only runs at mobile resolutions
//   const onClick = (e) => {
//     if (wWidth >= 576) return

//     const tag = getTagFromEvent(e);
//     if (!isFrontTag(tag)) {
//       rotateTags(indexesFromFrontTag(tag));
//       e.preventDefault();
//     }
//   }

//   useEffect(tagDefault, [wWidth, tags]);
//   useEffect(() => {
//     if (wWidth > 380) {
//       outerContainer.current.style.height = `41px`;
//       return;
//     }

//     const heightInner = innerContainer.current?.offsetHeight;
//     if (heightInner) {
//       outerContainer.current.style.height = `${heightInner}px`;
//     }
//   }, [wWidth, tags]);

//   useEffect(() => {
//     let mappedTags = mapTagDetailsToTags(tagDetails);
//     mappedTags = state.draftMode
//       ? addDraftTag(mappedTags)
//       : [...mappedTags]

//     setTags(mappedTags);
//   }, [tagDetails, state.draftMode]);

//   return (
//     <>
//       <div {...swipeHandlers} className={'tags'} ref={outerContainer}>
//         <div 
//           className={'tags-inner'} 
//           ref={innerContainer} 
//           onMouseEnter={mouseOver} 
//           onMouseLeave={mouseLeave}
//         >
//           {
//             tags.map((tag, index) => 
//               <GenerateTag 
//                 color={tag.details.color}
//                 text={tag.details.name || tag.details}
//                 identifier={`${parentKey}-${index}`}
//                 reference={tag.tag}
//                 click={onClick}
//                 key={`${parentKey}-${index}`}
//               />)
//           }
//         </div>
//       </div>
//     </>
//   )
// }

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
    const [r, g, b] = color.substring(4, color.length - 1).replace(/ /g, '').split(',') as any; //
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma < 80;
  }

  return true;
}

type TGenerateTag = {
  color: string,
  text: string,
  className: string,
  onClick: any
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
  } as any

  const textProperties = {
    // style: { 
    //   color: '#000000',
    //   backgroundColor: color,
    // }
  }
  
  if (onClick) properties.onClick = onClick;

  return (
    <Link {...properties}>
      <span {...textProperties}>{text}</span>
    </Link>
  )
});

export default TagMenu;
