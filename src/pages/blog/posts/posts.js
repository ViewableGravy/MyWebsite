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
      <Footer/>
    </>
  )
}

const Footer = () => {
  return (
    <div className={"footer"}>
      <Socials/>
      <p className={'footer copyright'}>© 2022. All rights reserved. Made by ViewableGravy</p>
    </div>
  )
}

const Socials = () => {
  return (
    <div className={"footer socials"}>
      <a className={'social'} href={'https://twitter.com/ViewableGravy'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
      </a>
      <a className={'social'} href={'https://github.com/ViewableGravy'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <a className={'social'} href={'https://www.linkedin.com/in/lleyton-morris-20540b192/'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
    </div>
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