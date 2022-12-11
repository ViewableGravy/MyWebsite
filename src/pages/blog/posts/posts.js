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
  const [hideBackgroundHightlight, moveBackgroundHighlight] = MovingBackgroundElement(listItems);

  const postCardsProperties = (post, index) => ({
    post: post,
    index: index,
    key: post._id,
    updateIndex: (element) => listItems.current[index] = element,
    moveBackgroundHighlight: moveBackgroundHighlight,
    hideBackgroundHightlight: hideBackgroundHightlight
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

  return (
    <>
      <PostsHead {...PostsHeadProperties()}/>
      <div className="posts">
        <ConditionalRenderChildren condition={!!posts}>{ 
          posts?.map((post, index) => <PostsCard {...postCardsProperties(post, index)} />) 
        }</ConditionalRenderChildren>
      </div>
      <div className="background-hover"/>
    </>
  )
}

const MovingBackgroundElement = (listItems) => {
  const [width,] = useWindowDimensions();

  const hideBackgroundHightlight = () => {
    const highlight = document.querySelector('.background-hover');
    highlight.style.backgroundColor = 'transparent';
  }

  const showBackgroundHightlight = () => {
    const highlight = document.querySelector('.background-hover');
    highlight.style.backgroundColor = 'white';
  }

  const moveBackgroundHighlight = (index) => {
    if (width > 576) {
      const ref = listItems.current[index];

      const width = ref?.offsetWidth;
      const distanceFromTop = ref?.offsetTop;
      const height = ref?.offsetHeight;
      const highlight = document.querySelector('.background-hover');

      highlight.style.top = `${distanceFromTop}px`;
      highlight.style.width = `${width}px`;
      highlight.style.height = `${height - 20}px`
      showBackgroundHightlight();
    }
  }

  useEffect(hideBackgroundHightlight, [width])

  return [hideBackgroundHightlight, moveBackgroundHighlight];
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

const PostsCard = ({ post, index, moveBackgroundHighlight, hideBackgroundHightlight, updateIndex }) => {  
  const [state,] = useGlobalState();

  const conditionallyAddDraftClass = (classes) => `${classes} ${state.draftMode ? 'draft' : ''}`;

  const blogItemContainerProperties = (index) => {
    return {
      ref: updateIndex, 
      className: 'blog-item',
      onMouseOver: () => moveBackgroundHighlight(index),
      onMouseLeave: hideBackgroundHightlight
    }
  }

  return (
    <>
      <div {...blogItemContainerProperties(index)}>
        <Link to={`/blog/${post.slug}`} className={`title_container`}>

          <div>
            <h2 className={conditionallyAddDraftClass(`title`)}>{post.title}</h2>
          </div>

          <div>
            <p className={conditionallyAddDraftClass(`summary`)} dangerouslySetInnerHTML={{ __html: post.summary }}/>
          </div>
          
        </Link>

        <div className='right-section'>
          <p className={conditionallyAddDraftClass(`date`)}>{post.date}</p>
          <TagsWrapper tagDetails={post.tags} parentKey={post._id}/>
        </div>

      </div>
    </>
  )
}

export default Posts;