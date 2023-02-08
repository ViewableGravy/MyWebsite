import React, { useState, useEffect, useRef } from "react";
import { useGlobalState } from "../../../functionality/globalState";
import { Link } from "react-router-dom";
import axios from 'axios';
import FlipToggle from "../toggle/toggle";
import { useWindowDimensions, ConditionalRenderChildren } from "../../../functionality/helper";
import { TagsWrapper } from "../tags-wrapper/tagsWrapper";
import './posts.scss'

const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
const api = `${protocol}://${server}:${port}/api`

export const Posts = () => {
  let listItems = useRef([]);

  const [posts, setPosts] = useState(null);

  const postCardsProperties = (post, index) => ({
    post: post,
    index: index,
    key: post._id,
    updateIndex: (element) => listItems.current[index] = element
  })

  const PostsHeadProperties = () => ({
    title: 'Posts',
    draftFunction: async () => {
      setPosts(null);
      axios.get(`${api}/blog/admin/post/drafts`)
        .then((response) => {
          setPosts(response.data.map((post) => ({
            ...post,
            title: post.title ?? 'Enter a new title here',
            summary: post.summary ?? 'Enter a new summary here',
            date: post.date ?? 'Jan 01 1800',
            dateIsDraft: true,
            summaryIsDraft: true,
            titleIsDraft: true
          })));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    publishedFunction: async () => {
      setPosts(null);
      try {
        const response = await axios.get(`${api}/blog/posts`);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      } 
    }
  })

  //if your screen is longer than 5 posts then I am sorry
  return (
    <>
      <PostsHead {...PostsHeadProperties()}/>
      <div className="posts">
        <BackgroundHoverMoveEffect>{
          posts 
            ? posts?.map((post, index) => <PostsCard {...postCardsProperties(post, index)} />) //once data has loaded
            : [...Array(5).keys()].map(() => <PostsCard/>) //loading animation
        }</BackgroundHoverMoveEffect>
      </div>
    </>
  )
}

const BackgroundHoverMoveEffect = ({ children }) => {
  const [width,] = useWindowDimensions();
  const childrenRef = useRef([]);
  const backgroundRef = useRef(null);

  const hideBackgroundHightlight = () => backgroundRef.current.style.backgroundColor = 'transparent';
  const showBackgroundHightlight = () => backgroundRef.current.style.backgroundColor = 'white';

  const Children = () => React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      ref: (ref) => (childrenRef.current[index] = ref),
      onMouseOver: () => {
        if (width > 576) {
          const ref = childrenRef.current[index];
          const width = ref?.offsetWidth;
          const distanceFromTop = ref?.offsetTop;
          const height = ref?.offsetHeight;
          const highlight = backgroundRef.current;
          highlight.style.top = `${distanceFromTop}px`;
          highlight.style.width = `${width}px`;
          highlight.style.height = `${height - 20}px`
          showBackgroundHightlight();
        }
      },
      onMouseLeave: hideBackgroundHightlight
    })
  );
  console.log(childrenRef.current)

  useEffect(hideBackgroundHightlight, [width])

  return (
    <>
      <Children/>
      <div className="background-hover" ref={backgroundRef}/>
    </>
  );
}

export const PostsHead = ({ title, draftFunction, publishedFunction }) => {
  const [state, dispatch] = useGlobalState();
  const [toggleState, setToggleState] = useState('Published');

  if (!draftFunction) draftFunction = () => {};
  if (!publishedFunction) publishedFunction = () => {};

  const changeToggle = () => {
    if (toggleState === 'Published') {
      setToggleState('Drafts');
      dispatch({draftMode: true});
      draftFunction();
    } else {
      setToggleState('Published');
      dispatch({draftMode: false});
      publishedFunction();
    }
  }

  useEffect(() => toggleState === 'Published' ? publishedFunction() : draftFunction(), [toggleState])

  return (
    <>
      <div id="posts-head">
        <h1 id="posts-title">{title}</h1>
        { state.token && <FlipToggle className="FlipToggle" onChange={changeToggle}/> }  
      </div>
    </>
  )
}

//new postcard
//{ post, index, updateIndex, ref }
const PostsCard = React.forwardRef((props, ref) => {
  const [state,] = useGlobalState();

  if (!props.post) return <div className={'blog-item loading'}/>

  const AddDraftClass = (classes) => `${classes} ${state.draftMode ? 'draft' : ''}`;
  
  const blogItemContainerProperties = {
    ref: props.updateIndex,
    className: 'blog-item'
  }

  const properties = {
    ref: ref,
    onMouseOver: props.onMouseOver,
    onMouseLeave: props.onMouseLeave
  }

  return (
    <>
      <div {...properties}>
        <div {...blogItemContainerProperties}>
          <Link to={`/blog/${props.post.slug}`} className={`title_container`}>
            <h2 className={AddDraftClass(`title`)}>{props.post.title}</h2>
            <p className={AddDraftClass(`summary`)} dangerouslySetInnerHTML={{ __html: props.post.summary }}/>
          </Link>
          <div className='right-section'>
            <p className={AddDraftClass(`date`)}>{props.post.date}</p>
            <TagsWrapper tagDetails={props.post.tags} parentKey={props.post._id}/>
          </div>
        </div>
      </div>
    </>
  )
});

export default Posts;