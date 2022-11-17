import { useState, useEffect, useRef } from "react";
import { useGlobalState } from "../../../functionality/globalState";
import { Link } from "react-router-dom";
import axios from 'axios';
import FlipToggle from "../toggle/toggle";
import { useWindowDimensions } from "../../../functionality/helper";
import { TagsWrapper } from "../tags-wrapper/tagsWrapper";
import './posts.scss'

const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
const api = `${protocol}://${server}:${port}/api`

export const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [toggleState, setToggleState] = useState('Published');
  const [state, dispatch] = useGlobalState();
  const [width,] = useWindowDimensions();

  let listItems = useRef([]);

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

  const getPosts = async (setPosts) => {
    try {
      const response = await axios.get(`${api}/blog/posts`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const getDrafts = async (setPosts) => {
    try {
      const response = await axios.get(`${api}/blog/admin/post/drafts`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const changeToggle = () => {
    if (toggleState === 'Published') {
      setToggleState('Drafts');
      dispatch({draftMode: true});
    } else {
      setToggleState('Published');
      dispatch({draftMode: false});
    }
  }

  useEffect(() => {
    if (toggleState === 'Published') {
      getPosts(setPosts) 
    } else {
      // Probably should put a fully default one if the api request fails
      axios.get(`${api}/blog/admin/post/drafts`)
        .then((response) => {
          const mapped = response.data.map((post) => {
            const newPost = post;

            if (!post.title) {
              newPost.title = 'Enter a new title here'
              newPost.titleIsDraft = true;
            }

            if (!post.summary) {
              newPost.summary = 'Enter a new summary here'
              newPost.summaryIsDraft = true;
            }

            if (!post.date) {
              newPost.date = 'Jan 01 1800'
              newPost.dateIsDraft = true;
            }

            newPost.dateIsDraft = true;
            newPost.summaryIsDraft = true;
            newPost.titleIsDraft = true;
            
            return newPost;
          });
          setPosts(mapped);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [toggleState])

  useEffect(() => {
    getPosts(setPosts);
  }, [])

  useEffect(() => {
    hideBackgroundHightlight();
  }, [width])

  return (
    <>
      <div id="posts-head">
        <h1 id="posts-title">Posts</h1>
        { state.token && <FlipToggle className="FlipToggle" onChange={changeToggle}/> }  
      </div>

      <ul className="posts">
        { posts && posts.map((post, index) =>
            <li 
              ref={(element) => listItems.current[index] = element} 
              className='blog-item' 
              key={post._id} 
              onMouseOver={() => moveBackgroundHighlight(index)} 
              onMouseLeave={hideBackgroundHightlight}
            >
              <Link to={`/blog/${post.slug}`} className={`title_container`}>
                <h2 className={`title ${post.titleIsDraft ? 'draft' : ''}`}>{post.title}</h2>
                <p className={`summary ${post.summaryIsDraft ? 'draft' : ''}`} dangerouslySetInnerHTML={{ __html: post.summary }}></p>
              </Link>
              <div className='right-section'>
                <p className={`date ${post.dateIsDraft ? 'draft' : ''}`}>{post.date}</p>
                <TagsWrapper tagDetails={post.tags} parentKey={post._id}/>
              </div>
            </li>
          )
        }
      </ul>

      <div className="background-hover"></div>
    </>
  )
}

export default Posts;