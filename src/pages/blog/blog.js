import React, { useState, useEffect, useRef, Children, createRef } from 'react';
import './blog.scss'
import { Link } from 'react-router-dom';
import { Menu } from './menu/menu.js'
import { FlipToggle } from './toggle/toggle'
import Portrait from '../../assets/images/Lleyton.png'
import classNames from 'classnames'
import { useGlobalState } from '../../functionality/globalState';
import axios from 'axios';


const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
const api = `${protocol}://${server}:${port}/api`

const About = () => {
  return (
    <div className="About">
      <div className="circle">
        <img src={Portrait}></img>
      </div>
      <p>I'm passionate about making things in NodeJS and React. Recently I've been enjoying WebSockets, Express API's and learning new SASS skills. I also love self hosting, automation and writing scripts (bash). I currently Work at <a href="https://ventraip.com.au/">VentraIP Australia</a> as a technical support Representative.</p>
    </div>
  )
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

const TagsWrapper = ({ tagDetails }) => {
  const tags = tagDetails.map(() => createRef()); //create an array of refs for each tag
  let timeout = null; 
  const colors = ['#ce3175', '#4e3d42', '#000000', '#4fb477']

  const tagHover = () => {
    const widths = tags.map((tag) => tag.current.offsetWidth);
    tags.forEach((tag, index) => {
        //culmination of widths before this one
        const totalWidth = widths.slice(0, index).reduce((a, b) => a + b + 10, 0);

        //how far to the right
        tag.current.style.right = `${totalWidth}px`;
    });
  }

  const tagDefault = () => {
    tags.forEach((tag, index) => {
      tag.current.style.right = `${index * 5}px`;
    });
  }

  const mouseOver = () => {
    tagHover();
    if (timeout) {
      clearTimeout(timeout);
      timeout = null; 
    }
  }

  const mouseLeave = () => {
    timeout = setTimeout(() => {
      tagDefault();
    }, 500);
  }

  useEffect(() => {
    tagDefault();
    //until this is specified in database, select a random colour for tag
    tags.forEach((tag) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      tag.current.style.backgroundColor = color;
      colors.splice(colors.indexOf(color), 1);
      console.log(colors);
    });
  }, [])

  return (
    <>
      <div className={'tags'}> {
          tagDetails && tagDetails.map((tag, index) => 
          <Link 
            ref={tags[index]} 
            to={'/'} 
            className={`tag`} 
            onMouseEnter={mouseOver} 
            onMouseLeave={mouseLeave}
          >
            {tag}
          </Link>)
      } </div>
    </>
  )
}

const Posts = ({  }) => {
  const [posts, setPosts] = useState(null);
  const [toggleState, setToggleState] = useState('Published');
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    toggleState === 'Published' 
      ? getPosts(setPosts) 
      : getDrafts(setPosts);
  }, [toggleState])

  useEffect(() => {
    getPosts(setPosts);
  }, [])

  const changeToggle = () => {
    toggleState === 'Published'
      ? setToggleState('Drafts')
      : setToggleState('Published');
  }

  return (
    <>
      <div id="posts-head">
        <h1 id="posts-title">Posts</h1>
        { state.token && <FlipToggle className="FlipToggle" onChange={changeToggle}/> }  
      </div>

      <ul className="posts">
        { posts && posts.map((post) =>
            <li className='blog-item' key={post._id}>
              <Link to={`/blog/${post.slug}`} className='title_container'>
                <h2 className='title'>{post.title}</h2>
                <p className={'summary'} dangerouslySetInnerHTML={{ __html: post.summary }}></p>
              </Link>
              <div className='right-section'>
                <p className='date'>{post.date}</p>
                <TagsWrapper tagDetails={post.tags}/>
              </div>
            </li>
          )
        }
      </ul>
    </>
  )
}

export const Blog = () => {  
  const [mobileView, setMatches] = useState(window.matchMedia("(max-width: 576px)").matches)
  const [menuOpen,] = useState(false); //use to change menu state of mobile burger menu
  const [, setMenuItems] = useState(classNames({
    desktop: true,
    mobile: false,
    open: false
  }))

  useEffect(() => {
    setMenuItems(classNames({
      desktop: !mobileView,
      mobile: mobileView,
      open: menuOpen
    }))
  }, [mobileView, menuOpen])

  useEffect(() => {
    window
      .matchMedia("(max-width: 576px)")
      .addEventListener('change', e => setMatches( e.matches ))
  }, [])

  return (
    <div id="blog_container">
      <div id="outer">
        <div id="background">
          <Menu author="ViewableGravy" /> {/* add option to customize links */}
          <About/>
          <Posts/>
        </div>
      </div>
    </div>
  )
}

{/* <h1>Steal the layout from this site: https://www.iamtimsmith.com/blog/using-mongodb-with-express-js</h1>
        <h1>Steal the Z from this site: https://zellwk.com/blog/crud-express-mongodb/</h1>
        <h1>Steal something from this site: https://flaviocopes.com/rest-api-express-mongodb/</h1> */}

export default Blog;