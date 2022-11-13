import React, { useState, useEffect } from 'react';
import { Menu } from './menu/menu.js'
import { About } from './about/about'
import classNames from 'classnames'
import Posts from './posts/posts';
import './blog.scss'

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
    <div className={"blog_container"}>
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