/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createRef, useState, useRef } from 'react';
import { useSwipeable } from "react-swipeable";
import { Link } from 'react-router-dom';
import './tagsWrapper.scoped.scss';
import { useWindowDimensions } from '../../../functionality/helper';
import { useGlobalState } from '../../../functionality/globalState';

//todo - add toggle (+) on left to toggle between on and off rather than just clicking the text
//on mobile this can be hidden and just clicking on an option while closed will toggle the state on (and show a minus to close)
export const TagsWrapper = ({ tagDetails, parentKey }) => {
  const [wWidth,] = useWindowDimensions();
  let   [tags, setTags] = useState([]);
  const [state,] = useGlobalState();
  const [, setIsHidden] = useState(true);

  const outerContainer = createRef();
  const innerContainer = createRef();
  const clearTimer = useRef();
  
  const mouseOver = () => {
    if (clearTimer.current)
      clearTimeout(clearTimer.current);

    innerContainerHoverDesktop();
    setIsHidden(false);
  }

  const mouseLeave = () => {
    setIsHidden(true);
    if (wWidth >= 576) {
      clearTimer.current = setTimeout(() => {
        tagDefault();
        resetInnerContainerWidth();
      }, 750);
    }
  }

  const incrementTags = () => tags = tags.map(({ tag, index }) => ({ tag: tag, index: ++index >= tags.length ? 0 : index }));
  const decrementTags = () => tags = tags.map(({ tag, index }) => ({ tag: tag, index: --index < 0 ? tags.length - 1 : index }));
  const getFrontTag = () => tags.find(({ index }) => index + 1 === tags.length);
  const getTagFromEvent = (e) => tags.find(({ tag }) => tag.current === e.target);
  const isFrontTag = (tag) => tag.index + 1 === tags.length;
  const indexesFromFrontTag = (tag) => getFrontTag().index - tag.index;
  const resetTagsStyling = () => tags?.forEach(({ tag }) => {
    if (tag.current?.style) {
      tag.current.style.width = null;
      tag.current.style.color = null;
      tag.current.style.zIndex = null;
      tag.current.style.right = null;
    }
  });

  const mapTagDetailsToTags = (tags) => tags ? tags.map((_, index) => ({ tag: createRef(), index, details: tagDetails[index] })) : [];
  // must also change the index of the tag in the array (TODO)
  const sortTags = (tags) => tags ? tags.sort((a, b) => a.details.length - b.details.length) : [];
  const addDraftTag = (ts) => [...ts, { tag: createRef(), index: tags.length, details: 'New Tag', draft: true }]
  const removeDraftTag = (ts) => ts.filter(({ draft }) => !draft);
  const getDraftTag = () => tags.find(({ draft }) => draft);


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
      const widths = tags.map(({ tag }) => tag.current.offsetWidth);
      tags.forEach(({ tag }, index) => {
        //culmination of widths before this one
        const totalWidth = widths.slice(0, index).reduce((a, b) => a + b + 10, 0);

        //how far to the right
        tag.current.style.right = `${totalWidth}px`;
      });
    }
  }

  //new
  const innerContainerHoverDesktop = () => {
    if (wWidth > 576) {
      const widths = tags.map(({ tag }) => tag.current.offsetWidth);

      tags.forEach(({ tag }, index) => {
        //culmination of widths before this one
        const totalWidth = widths.slice(0, index).reduce((a, b) => a + b + 10, 0);

        //how far to the right
        tag.current.style.right = `${totalWidth}px`;
      });

      innerContainer.current.style.width = `${widths.reduce((a, b) => a + b + 10, 0)}px`;
    }
  }

  const resetInnerContainerWidth = () => {
    document.querySelectorAll('.tags-inner').forEach((tag) => {
      tag.style.width = null;
    });
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

      tags?.forEach(({ tag, index }) => {

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

    tags?.forEach(({ tag, index }) => {
      // only apply this styling on normal mobile and desktop (not tiny mobile)
      if (tag.current && wWidth > 380) {
        tag.current.style.right = `${index * 10}px`;
        tag.current.style.zIndex = index;
      }
    })
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
  useEffect(() => {
    if (wWidth > 380) {
      outerContainer.current.style.height = `41px`;
      return;
    }

    const heightInner = innerContainer.current?.offsetHeight;
    if (heightInner) {
      outerContainer.current.style.height = `${heightInner}px`;
    }
  }, [wWidth, tags]);

  useEffect(() => {
    let mappedTags = mapTagDetailsToTags(tagDetails);
    mappedTags = state.draftMode
      ? addDraftTag(mappedTags)
      : [...mappedTags]

    setTags(mappedTags);
  }, [tagDetails, state.draftMode]);

  const tagProperties = (tag, index) => {

    const props = {
      color: tag.details.color,
      text: tag.details.name || tag.details,
      identifier: `${parentKey}-${index}`,
      reference: tag.tag,
      //mouseOver: mouseOver,
      //mouseLeave: mouseLeave,
      click: tagClick
    };

    return props;
  };

  return (
    <>
      <div {...swipeHandlers} className={'tags'} ref={outerContainer}>
        <div className={'tags-inner'} ref={innerContainer} onMouseEnter={mouseOver} onMouseLeave={mouseLeave}>{
          tags.map((tag, index) => <GenerateTag {...tagProperties(tag, index)} />)
        }</div>
      </div>
    </>
  )
}

const isDarkColor = (color) => {

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
    const [r, g, b] = color.substring(4, color.length - 1).replace(/ /g, '').split(',');
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma < 80;
  }

  return true;
}

export const GenerateTag = ({ color, reference, text, identifier, className, click, mouseOver, mouseLeave }) => {
  if (!identifier) identifier = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  if (!color) color = '#000000'; //black

  const properties = {
    key: identifier,
    to: '/',
    style: { touchAction: 'pan-x' }
  }

  const textProperties = {
    style: { color: '#000000' } //black
  }

  properties.style.backgroundColor = color ? color : '#000000'; //black

  if (isDarkColor(color)) textProperties.style.color = '#f1f1f1'; //white
  if (mouseOver) properties.onMouseEnter = mouseOver;
  if (mouseLeave) properties.onMouseLeave = mouseLeave;
  if (click) properties.onClick = click;
  if (reference) properties.ref = reference;

  return (
    <Link {...properties} className={`${className} tag`}>
      <span {...textProperties}>{text}</span>
    </Link>
  )
}

export default TagsWrapper;
