import React, { useState, useEffect, useRef } from 'react';
import './blog.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Menu } from './menu/menu.js'
import { FlipToggle } from './toggle/toggle'
import Portrait from '../../assets/images/Lleyton.png'
import classNames from 'classnames'
import { useGlobalState } from '../../functionality/globalState';
import axios from 'axios';

export const Blog = () => {
  const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
  const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
  const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
  const api = `${protocol}://${server}:${port}/api`

  const navigate = useNavigate();
  const [state, dispatch] = useGlobalState();
  const [toggleState, setToggleState] = useState('Published');

  const [posts, setPosts] = useState(null);
  const [mobileView, setMatches] = useState(window.matchMedia("(max-width: 576px)").matches)
  const [menuOpen, setMenuOpen] = useState(false); //use to change menu state of mobile burger menu
  const [menuItemsClasses, setMenuItems] = useState(classNames({
    desktop: true,
    mobile: false,
    open: false
  }))

  const getPosts = async () => {
    try {
      const response = await axios.get(`${api}/blog/posts`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getDrafts = async () => {
    try {
      const response = await axios.get(`${api}/blog/admin/post/drafts`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setMenuItems(classNames({
      desktop: !mobileView,
      mobile: mobileView,
      open: menuOpen
    }))
  }, [mobileView, menuOpen])

  useEffect(() => {
    getPosts();

    window
      .matchMedia("(max-width: 576px)")
      .addEventListener('change', e => setMatches( e.matches ))
  }, [])

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

  const Posts = () => {
    useEffect(() => {
      toggleState === 'Published' 
        ? getPosts() 
        : getDrafts();
    }, [toggleState])

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
                  <div className='tags'>
                    {
                      post.tags && post.tags.map((tag, index) => <Link to={'/'} className={`tag ${index}`}>{tag}</Link>)
                    }
                  </div>
                </div>
              </li>
            )
          }
        </ul>
        {/* <div id ="posts-head">
          <h1 id="posts-title">Posts</h1>
          { state.token && <FlipToggle className="FlipToggle" onChange={changeToggle}/> }  
        </div>
        <ul id="posts">
        {
          posts && posts.map(post => 
            <li key={post._id}>
              <Link to={`/blog/${post.slug}`} className='title_container'>
                { toggleState === 'Drafts' && <span>{'[Draft] '}</span> }<h2>{post.title}</h2>
              </Link>
              <span>Author:</span><a className='author'> {post.author} </a>
              <span>Posted:</span><span className='date'> {post.date}</span>
              <p dangerouslySetInnerHTML={{ __html: post.summary }}></p>
              <span>Tags: </span>
              {
                post?.tags && post.tags.map((tag, index, arr) => 
                  <span key={index}>
                    <a>{ tag }</a>
                    <span>{index + 1 === arr.length ? "" : ", " }</span>
                  </span>
                )
              }
            </li>
          )
        }
        </ul> */}
      </>
    )
  }

  return (
    <div id="blog_container">
      <div id="outer">
        <div id="background">
          <Menu author="ViewableGravy" /> {/* add option to customize links */}
          { About() }
          { Posts() }
        </div>
      </div>
    </div>
  )
}

{/* <h1>Steal the layout from this site: https://www.iamtimsmith.com/blog/using-mongodb-with-express-js</h1>
        <h1>Steal the Z from this site: https://zellwk.com/blog/crud-express-mongodb/</h1>
        <h1>Steal something from this site: https://flaviocopes.com/rest-api-express-mongodb/</h1> */}

export default Blog;