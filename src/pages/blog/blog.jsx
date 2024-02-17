/***** BASE IMPORTS *****/
import classNames from 'classnames';
import { useNavigate } from '@tanstack/react-router';

/***** CUSTOM IMPORTS *****/
import { Menu } from './menu/menu'
import { About } from './menu/about/about'
import Posts from './menu/posts/posts';
import { Header } from 'pages/components/navbar';

/***** CONSTS *****/
import './blog.scss'

export const Blog = () => {
  const navigate = useNavigate();
  
  return (
    <BlogContainer>
      <Menu author="ViewableGravy"/>
      {import.meta.env.DEV && (
        <Header title="ViewableGravy">
          <Header.Button onClick={() => navigate({ to: "/dashboard" })}>Dashboard</Header.Button>
          <Header.Button onClick={() => navigate({ to: "/about" })}>About</Header.Button>
          <Header.Button onClick={() => navigate({ to: "/blog" })}>Blog</Header.Button>
        </Header>
        )}
      <About/>
      <Posts/>
    </BlogContainer>
  )
}

export const BlogContainer = ({ children, className }) => {
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