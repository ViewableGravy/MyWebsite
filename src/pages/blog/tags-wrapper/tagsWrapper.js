import { useEffect, createRef } from 'react';
import { useSwipeable } from "react-swipeable";
import { Link } from 'react-router-dom';
import './tagsWrapper.scss';
import { useWindowDimensions } from '../../../functionality/helper';

//todo - add toggle (+) on left to toggle between on and off rather than just clicking the text
//on mobile this can be hidden and just clicking on an option while closed will toggle the state on (and show a minus to close)
export const TagsWrapper = ({ tagDetails }) => {
  const [wWidth,] = useWindowDimensions();
  let tags = tagDetails?.map((_, i) => ({ index: i, tag: createRef() }))

  let timeout = null; 
  const colors = ['#ce3175', '#4e3d42', '#000000', '#4fb477']

  const incrementTags = (ts) => tags = ts.map(({tag, index}) => ({ tag: tag, index: ++index >= tags.length ? 0 : index }));
  const decrementTags = (ts) => tags = ts.map(({tag, index}) => ({ tag: tag, index: --index < 0 ? tags.length - 1 : index }));
  const getFrontTag = (ts) => ts.find(({index}) => index + 1 === ts.length);
  const getTagFromEvent = (e) => tags.find(({tag}) => tag.current === e.target);
  const isFrontTag = (t) => t.index + 1 === tags.length;
  const indexesFromFrontTag = (tag) => getFrontTag(tags).index - tag.index;  
  const resetTagsStyling = (ts) => ts?.forEach(({tag}) => {
    tag.current.style.width = null;
    tag.current.style.color = null;
    tag.current.style.zIndex = null;
    tag.current.style.right = null;
  });

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => rotateTags(-1),
    onSwipedLeft: () => rotateTags(1),
    delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
    preventDefaultTouchmoveEvent: true,  // call e.preventDefault *See Details*
    trackTouch: true,                     // track touch input
    trackMouse: false,                    // track mouse input
  })

  const tagHoverDesktop = () => {
    if (wWidth > 576) {
      const widths = tags.map(({tag}) => tag.current.offsetWidth);
      tags.forEach(({tag}, index) => {
        //culmination of widths before this one
        const totalWidth = widths.slice(0, index).reduce((a, b) => a + b + 10, 0);

        //how far to the right
        tag.current.style.right = `${totalWidth}px`;
      });
    }
  }

  const rotateTags = (increment) => {
    if (wWidth < 576 && wWidth > 380) {
      if (!increment) 
        incrementTags(tags)
      else 
        for (let i = 0; i < Math.abs(increment); i++)
          increment < 0 ? decrementTags(tags) : incrementTags(tags);

      const front = getFrontTag(tags);

      front.tag.current.style.width = null;
      front.tag.current.style.color = null;

      tags?.forEach(({tag, index}) => {
      
        tag.current.style.right = `${index * 10}px`
        tag.current.style.zIndex = index;

        if (front.index === index) {
          tag.current.style.width = null;
        } else {
          tag.current.style.width = `${front.tag.current.offsetWidth - 8 - 8 - 10}px`;
          tag.current.style.color = 'transparent';
        }
      });
    }
  }

  const tagDefault = () => {
    resetTagsStyling(tags);

    tags?.forEach(({tag, index}) => {
      // only apply this styling on normal mobile and desktop (not tiny mobile)
      if (tag.current && wWidth > 380) {
        tag.current.style.right = `${index * 10}px`;
        tag.current.style.zIndex = index;
      }
    })
  }

  const mouseOver = () => {
    tagHoverDesktop();
    if (timeout) {
      clearTimeout(timeout);
      timeout = null; 
    }
  }

  const mouseLeave = () => {
    if (wWidth >= 576) {
      timeout = setTimeout(() => {
        tagDefault();
      }, 500);
    }
  }

  //only runs at mobile resolutions
  const tagClick = (e) => {
    if (wWidth >= 576) return

    const tag = getTagFromEvent(e);
    if (!isFrontTag(tag)) {
      rotateTags(indexesFromFrontTag(tag));
      e.preventDefault();
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tagDefault(); }, [wWidth]);

  useEffect(() => {
    tagDefault();

    //until this is specified in database, select a random colour for tag
    tags?.forEach(({tag}) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      tag.current.style.backgroundColor = color;
      colors.splice(colors.indexOf(color), 1);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div {...swipeHandlers} className={'tags'}> 
        {
          tagDetails && tagDetails.map((tag, index) => 
          <Link 
            ref={tags[index].tag} 
            to={'/'} 
            className={`tag`} 
            onMouseEnter={mouseOver} 
            onMouseLeave={mouseLeave}
            onClick={tagClick}
            style={{ touchAction: 'pan-x' }}
          >
            {tag}
          </Link>)
        } 
      </div>
    </>
  )
}

export default TagsWrapper;
