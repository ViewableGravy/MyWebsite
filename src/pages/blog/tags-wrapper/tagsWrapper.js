/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createRef, useState } from 'react';
import { useSwipeable } from "react-swipeable";
import { Link } from 'react-router-dom';
import './tagsWrapper.scss';
import { useWindowDimensions } from '../../../functionality/helper';
import { useGlobalState } from '../../../functionality/globalState';

//todo - add toggle (+) on left to toggle between on and off rather than just clicking the text
//on mobile this can be hidden and just clicking on an option while closed will toggle the state on (and show a minus to close)
export const TagsWrapper = ({ tagDetails, parentKey }) => {
  const [wWidth,] = useWindowDimensions();
  let [tags, setTags] = useState([]);
  const [state, ] = useGlobalState();
  const [colors, setColors] = useState(['#ce3175', '#4e3d42', '#000000', '#4fb477'])

  let timeout = null; 

  const incrementTags = () => tags = tags.map(({tag, index}) => ({ tag: tag, index: ++index >= tags.length ? 0 : index }));
  const decrementTags = () => tags = tags.map(({tag, index}) => ({ tag: tag, index: --index < 0 ? tags.length - 1 : index }));
  const getFrontTag   = () => tags.find(({index}) => index + 1 === tags.length);
  const getTagFromEvent = (e) => tags.find(({tag}) => tag.current === e.target);
  const isFrontTag    = (tag) => tag.index + 1 === tags.length;
  const indexesFromFrontTag = (tag) => getFrontTag().index - tag.index; 
  const resetTagsStyling = () => tags?.forEach(({tag}) => {
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
        incrementTags()
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
    resetTagsStyling();

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


  const mapTagDetailsToTags = (tags) => tags ? tags.map((_, index) => ({ tag: createRef(), index, details: tagDetails[index] })) : [];
  // must also change the index of the tag in the array (TODO)
  const sortTags = (tags) => tags ? tags.sort((a,b) => a.details.length - b.details.length) : [];
  const addDraftTag = (tags) => tags.push({ tag: createRef(), index: tags.length, details: 'New Tag', draft: true });
  const removeDraftTag = () => tags.filter(({draft}) => !draft);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => tagDefault(), [wWidth, tags]);
  useEffect(() => setColors(['#ce3175', '#4e3d42', '#000000', '#4fb477']), [])

  useEffect(() => {
    let mappedTags = mapTagDetailsToTags(tagDetails);
    state.draftMode ? addDraftTag(mappedTags) : removeDraftTag();
    setTags(mappedTags);
  }, [tagDetails, state.draftMode])
  
  useEffect(() => tags?.forEach(({tag, draft}) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    if (!draft) {
      tag.current.style.backgroundColor = color;
      colors.splice(colors.indexOf(color), 1);
    }
  }), [colors])

  return (
    <>
      <div {...swipeHandlers} className={'tags'}> 
        {
          tags.map((tag, index) => 
            <Link 
              key={`${parentKey}-${index}`}
              ref={tag.tag} 
              to={'/'} 
              className={`tag ${tag.draft ? 'draft' : ''}`} 
              onMouseEnter={mouseOver} 
              onMouseLeave={mouseLeave}
              onClick={tagClick}
              style={{ touchAction: 'pan-x' }}
            >{tag.details}</Link>
          )
        } 
      </div>
    </>
  )
}

export default TagsWrapper;
