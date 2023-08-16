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