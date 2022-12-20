/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createRef, useState } from 'react';
import { useSwipeable } from "react-swipeable";
import { Link } from 'react-router-dom';
import './tagsWrapper.scss';
import { useWindowDimensions } from '../../../functionality/helper';
import { useGlobalState } from '../../../functionality/globalState';
import { DraftSettings } from '../draftSettings/draftSettings';

//todo - add toggle (+) on left to toggle between on and off rather than just clicking the text
//on mobile this can be hidden and just clicking on an option while closed will toggle the state on (and show a minus to close)
export const TagsWrapper = ({ tagDetails, parentKey }) => {
  const [wWidth,] = useWindowDimensions();
  let [tags, setTags] = useState([]);
  const [state, ] = useGlobalState();
  const [colors, setColors] = useState(['#ce3175', '#4e3d42', '#000000', '#4fb477'])
  const [isHidden, setIsHidden] = useState(true);

  let timeout = null; 

  const incrementTags = () => tags = tags.map(({tag, index}) => ({ tag: tag, index: ++index >= tags.length ? 0 : index }));
  const decrementTags = () => tags = tags.map(({tag, index}) => ({ tag: tag, index: --index < 0 ? tags.length - 1 : index }));
  const getFrontTag   = () => tags.find(({index}) => index + 1 === tags.length);
  const getTagFromEvent = (e) => tags.find(({tag}) => tag.current === e.target);
  const isFrontTag    = (tag) => tag.index + 1 === tags.length;
  const indexesFromFrontTag = (tag) => getFrontTag().index - tag.index; 
  const resetTagsStyling = () => tags?.forEach(({tag}) => {
    if (tag.current?.style) {
      tag.current.style.width = null;
      tag.current.style.color = null;
      tag.current.style.zIndex = null;
      tag.current.style.right = null;
    }
  });

  const mapTagDetailsToTags = (tags) => tags ? tags.map((_, index) => ({ tag: createRef(), index, details: tagDetails[index] })) : [];
  // must also change the index of the tag in the array (TODO)
  const sortTags = (tags) => tags ? tags.sort((a,b) => a.details.length - b.details.length) : [];
  const addDraftTag = (ts) => [...ts, { tag: createRef(), index: tags.length, details: 'New Tag', draft: true }] 
  const removeDraftTag = (ts) => ts.filter(({draft}) => !draft);
  const getDraftTag = () => tags.find(({draft}) => draft);
  

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
    if (timeout) {
      clearTimeout(timeout);
      timeout = null; 
    }
    tagHoverDesktop();
    setIsHidden(false);
  }

  const mouseLeave = () => {
    setIsHidden(true);
    if (wWidth >= 576) {
      timeout = setTimeout(() => {
        tagDefault();
      }, 750);
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

  const tagEdit = (e) => {
    if (e.data === '\n') {
      e.preventDefault();
      e.target.blur();
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(tagDefault, [wWidth, tags]);
  useEffect(() => setColors(['#ce3175', '#4e3d42', '#000000', '#4fb477']), [])

  useEffect(() => {
    let mappedTags = mapTagDetailsToTags(tagDetails);
    mappedTags = state.draftMode 
      ? addDraftTag(mappedTags)
      : [...mappedTags]

    setTags(mappedTags);
  }, [tagDetails, state.draftMode]);
  
  useEffect(() => tags?.forEach(({tag, draft, details}) => {
    if (details.color) return tag.current.style.backgroundColor = details.color;
    const color = colors[Math.floor(Math.random() * colors.length)];
    if (!draft) {
      tag.current.style.backgroundColor = color;
      colors.splice(colors.indexOf(color), 1);
    }
  }), [colors])

  const tagProperties = (tag, index) => {

    const props = {
      tag: tag,
      index: index,
      mouseOver: mouseOver,
      mouseLeave: mouseLeave,
      click: tagClick,
      parentKey: parentKey,
    };

    return props;
  };

  return (
    <>
      <div {...swipeHandlers} className={'tags'}>{
          tags.map((tag, index) => <GenerateTag className={'tag'} {...tagProperties(tag, index)}/>)
      }</div>
    </>
  )
}

// tag: {tag: ref, draft: bool, details: {name: string, color: string}}
const GenerateTag = ({tag, index, mouseOver, mouseLeave, click, parentKey, className}) => {
  if (!tag) return null;
  if (!tag.details) return null;
  if (!parentKey) return null;
  
  const properties = {
    key: `${parentKey}-${index}`,
    to: '/',
    style: { touchAction: 'pan-x' }
  }

  if (tag.draft) properties.className += ' draft';
  if (tag.details?.color) properties.style.backgroundColor = tag.details.color;
  if (mouseOver) properties.onMouseEnter = mouseOver;
  if (mouseLeave) properties.onMouseLeave = mouseLeave;
  if (click) properties.onClick = click;
  if (tag.tag) properties.ref = tag.tag;

  return (
    <Link className={className} {...properties}>{tag.details.name || tag.details}</Link>
  );
}

export default TagsWrapper;
