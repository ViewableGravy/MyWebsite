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
    updateIndex: (element) => listItems.current[index] = element,
    post: post,
    index: index,
    moveBackgroundHighlight: moveBackgroundHighlight,
    hideBackgroundHightlight: hideBackgroundHightlight,
    key: post._id
  })

  return (
    <>
      <PostsHead setPosts={setPosts}/>
      <div className="posts">
        <ConditionalRenderChildren condition={!!posts}>{ 
          posts?.map((post, index) => <PostCard {...postCardsProperties(post, index)} />) 
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

const PostsHead = ({ setPosts }) => {
  const [state, dispatch] = useGlobalState();
  const [toggleState, setToggleState] = useState('Published');

  const changeToggle = () => {
    if (toggleState === 'Published') {
      setToggleState('Drafts');
      dispatch({draftMode: true});
    } else {
      setToggleState('Published');
      dispatch({draftMode: false});
    }
  }

  const getPosts = async (setPosts) => {
    setPosts(null);
    try {
      const response = await axios.get(`${api}/blog/posts`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    } 
  }
  
  const getDrafts = async (setPosts) => {
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
  }

  useEffect(() => toggleState === 'Published' ? getPosts(setPosts) : getDrafts(setPosts), [toggleState])

  return (
    <>
      <div id="posts-head">
        <h1 id="posts-title">Posts</h1>
        { state.token && <FlipToggle className="FlipToggle" onChange={changeToggle}/> }  
      </div>
    </>
  )
}

const PostCard = ({ post, index, moveBackgroundHighlight, hideBackgroundHightlight, updateIndex }) => {  
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
      <div {...blogItemContainerProperties(index, post._id)}>
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