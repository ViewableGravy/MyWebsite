import { useState, useEffect } from 'react';
import classNames from 'classnames'
import { useStore } from 'functionality/state/state';
import { logout } from '../../../functionality/authentication/authentication';
import { useMedia } from 'hooks/useMedia';
import { Link } from '@tanstack/react-router';
import './menu.scss'

/**
 * @param {{
 *  author: string,
 *  style?: object,
 *  className?: string
 * }} props
 */
export const Menu = ({
  author, 
  style,
  className
}) => {
  const media = useMedia();
  //TODO: Apply useDelay and manually set visibility after the transition time. 0.35s, also set transition time in style instead of CSS here (id=close)
  //Probably worth a full refactor when I am feeling like it
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  /***** RENDER VARIABLES *****/
  const menuClassName = classNames({
    desktop: !['xs', 'sm'].includes(media),
    mobile: ['xs', 'sm'].includes(media),
    open: isMobileMenuOpen,
  }, className)

  /***** RENDER *****/
  return (
    <div id="menu" className={menuClassName} style={style}>
      <div id="left" >
        <span id="Author">{author}</span>
      </div>
      <div id="right" className={menuClassName}> 
        <a href="https://status.gravy.cc/">Uptime</a>
        <a href="https://github.com/ViewableGravy">Github</a>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About Me</Link>
        <OwnAuthenticationAction />
        {['xs', 'sm'].includes(media) && (
          <div id="close" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}></div>
        )}
      </div>
      {
        ['xs', 'sm'].includes(media) && (
          <div className={"borger"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )
      }
    </div>
  )
}

/**
 * Internal component for rendering the login/logout button
 */
const OwnAuthenticationAction = () => {
  const [{token}, dispatch] = useStore((store) => ({
    token: store.token
  }));

  if (token) {
    return <button onClick={() => logout(dispatch)}>Logout</button>
  } else {
    return <Link to="/login">Login</Link>
  }
}

export default Menu;