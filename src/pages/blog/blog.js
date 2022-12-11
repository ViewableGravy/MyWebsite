import React from 'react';
import { Menu } from './menu/menu.js'
import { About } from './about/about'
import Posts from './posts/posts';
import './blog.scss'

export const Blog = () => {
  return (
    <BlogContainer>
      <Menu author={"ViewableGravy"}/>
      <About/>
      <Posts/>
    </BlogContainer>
  )
}

export const BlogContainer = ({ children }) => {
  return (
    <div className={"blog_container"}>
      <div id={"outer"}>
        <div id={"background"}>
          {children}
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-lone-blocks
{/* 
  Steal the layout from this site: https://www.iamtimsmith.com/blog/using-mongodb-with-express-js
  Steal the Z from this site: https://zellwk.com/blog/crud-express-mongodb/
  Steal something from this site: https://flaviocopes.com/rest-api-express-mongodb/
*/}

export default Blog;