/***** BASE IMPORTS *****/
import classNames from 'classnames';
import { useNavigate } from '@tanstack/react-router';

/***** CUSTOM IMPORTS *****/
import { Menu } from './menu/menu'
import { About } from './menu/about/about'
import Posts from './menu/posts/posts';
import { Header } from 'pages/components/navbar';

/***** CONSTS *****/
import logo from 'assets/images/lucidchartLogo.png';
import './blog.scss'
import { useMedia } from 'hooks/useMedia';

export const Blog = () => {
  const navigate = useNavigate();
  const isMobile = useMedia(['xs', 'sm'])
  
  return (
    <BlogContainer>
      {import.meta.env.DEV && (
        <Header 
          className="BlogContainer__Header" 
          title="ViewableGravy" 
          image={<img src={logo} alt="logo" />} 
          width={{ 
            desktop: ["230px", "calc(100% - 90px)", "calc(800px - 50px)"],
            mobile: ["230px", "calc(100% - 50px)", "calc(800px - 50px)"]
          }}
        >
          <Header.Button activeRoute="/dashboard" onClick={() => navigate({ to: "/dashboard" })}>
            Dashboard
          </Header.Button>
          <Header.Button activeRoute="/about" onClick={() => navigate({ to: "/about" })}>
            About
          </Header.Button>
          <Header.Button activeRoute="/blog" onClick={() => navigate({ to: "/blog" })}>
            Blog
          </Header.Button>
          <Header.Button activeRoute="/contact" onClick={() => navigate({ to: "/contact" })}>
            Contact
          </Header.Button>
          <Header.Button activeRoute="/login" onClick={() => navigate({ to: "/login" })}>
            Login
          </Header.Button>
        </Header>
      )}
      <About style={{ marginTop: isMobile ? 50 : 160 }} />
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