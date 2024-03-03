/***** BASE IMPORTS *****/
import classNames from 'classnames';
import React from 'react';

/***** CUSTOM IMPORTS *****/
import { About } from './menu/about/about'
import Posts from './menu/posts/posts';
import { Header } from 'components/navbar';

/***** UTILITIES *****/
import { useMedia } from 'hooks/useMedia';

/***** CONSTS *****/
import './blog.scss'

/***** COMPONENT START *****/
export const Blog = () => {
  /***** HOOKS *****/
  const isMobile = useMedia(['xs', 'sm'])

  /***** RENDER HELPERS *****/
  const headerProps = Header.useHeaderProps({
    className: "BlogContainer__Header",
  })
  
  /***** RENDER *****/
  return (
    <BlogContainer>
      <Header {...headerProps}/>
      <About style={{ marginTop: isMobile ? 50 : 160 }} />
      <Posts/>
    </BlogContainer>
  )
}
/***** COMPONENT END *****/

type TBlogContainer = React.FC<{
  children: React.ReactNode,
  className?: string
}>

export const BlogContainer: TBlogContainer = ({ children, className }) => {
  const _className = classNames('blog_container', className)

  return (
    <div className={_className}>
      <div id="outer">
        <div id="background">
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