import React, { useState, useEffect } from 'react';
import './blog.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Menu } from './menu/menu.js'
import { FlipToggle } from './toggle/toggle'
import Portrait from '../../assets/images/Lleyton.png'
import classNames from 'classnames'
import { useGlobalState } from '../../global';

export const Blog = () => {
  const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
  const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
  const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';

  const api = `${protocol}://${server}:${port}/api`

  const [state, dispatch] = useGlobalState();

  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [mobileView, setMatches] = useState(
    window.matchMedia("(max-width: 576px)").matches //initial state based on screen
  )
  const [menuOpen, setMenuOpen] = useState(false); //use to change menu state of mobile burger menu

  const menuItems = {
    desktop: true,
    mobile: false,
    open: false
  };

  const [menuItemsClasses, setMenuItems] = useState(classNames(menuItems))

  useEffect(() => {
    setMenuItems(classNames({
      desktop: !mobileView,
      mobile: mobileView,
      open: menuOpen
    }))
  }, [mobileView, menuOpen])

  useEffect(() => {
    fetch(`${api}/blog/posts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`)
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => console.log(err))
      .finally(() => {})

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
    return (
      <>
        <div id ="posts-head">
          <h1 id="posts-title">Posts</h1>
          {
            state.token && <FlipToggle className="FlipToggle"/>
          }  
        </div>
        <ul id="posts">
        {
          posts && posts.map(post => 
            <li key={post._id}>
              <Link to={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
              </Link>
              <span>Author:</span><a className='author'> {post.author} </a>
              <span>Posted:</span><span className='date'> {post.date}</span>
              <p dangerouslySetInnerHTML={{ __html: post.summary }}></p>
              <span>Tags: </span>
              {
                post.tags.map((tag, index, arr) => 
                  <span key={index}>
                    <a>{ tag }</a>
                    <span>{index + 1 === arr.length ? "" : ", " }</span>
                  </span>
                )
              }
            </li>
          )
        }
        </ul>
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