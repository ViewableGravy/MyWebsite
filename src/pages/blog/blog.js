import React, { useState, useEffect } from 'react';
import './blog.scss'
import { useNavigate } from 'react-router-dom'
import Portrait from '../../assets/Lleyton.png'

export const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileView, setMatches] = useState(
    window.matchMedia("(max-width: 576px)").matches //initial state based on screen
  )
  const [menuOpen, setMenuOpen] = useState(false); //use to change menu state of mobile burger menu

  useEffect(() => {
    fetch('http://192.168.1.193:3000/api/blog/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`)
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setPosts(null);
      })
      .finally(() => {
        setLoading(false);
      })

    window
      .matchMedia("(max-width: 576px)")
      .addEventListener('change', e => setMatches( e.matches ))
  }, [])
  
  return (
    <div id="blog_container">
      <div id="outer">
        <div id="background">
          <div id="menu">
            <div id="left" className={mobileView ? 'mobile' : 'desktop'}>
              <span id="Author">ViewableGravy</span> 
              { !mobileView && <span id="category">Category: ALL</span> }
            </div>
            { 
              !mobileView && 
                <div id="right" className={mobileView ? 'mobile' : 'desktop'}>
                  <a>...</a>
                  <a href="https://status.gravy.cc/">Uptime</a>
                  <a href="https://github.com/ViewableGravy">github</a>
                  <a onClick={() => navigate('/')}>Home</a>
                </div> 
              ||
                <div className={mobileView ? 'borger mobile' : 'borger desktop'} onClick={()=> setMenuOpen(!menuOpen)}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
            }
          </div>
          <div className="About">
            <div className="circle">
              <img src={Portrait}></img>
            </div>
            <p>I like making things in NodeJS, React and Express. I also love server administration, self hosting and writing bash scripts. I currently Work at VentraIP Australia as a technical support Representative.</p>
          </div>
          <h1>Posts</h1>
          <ul id="posts">
          {
            posts && posts.map(post => 
              <li key={post._id}>
                <h2 onClick={()=> navigate(`/blog/${post.slug}`)}>{post.title}</h2>
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
        </div>
      </div>
    </div>
  )
}

{/* <h1>Steal the layout from this site: https://www.iamtimsmith.com/blog/using-mongodb-with-express-js</h1>
        <h1>Steal the Z from this site: https://zellwk.com/blog/crud-express-mongodb/</h1>
        <h1>Steal something from this site: https://flaviocopes.com/rest-api-express-mongodb/</h1> */}

export default Blog;