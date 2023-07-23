import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import './menu.scss'
import { useGlobalState, useStore } from '../../../functionality/globalState';
import { logout } from '../../../functionality/authentication/authentication';
import TLink from '../../../components/TLink';

// author: string
export const Menu = (props) => {
  const {author, style} = props

  const initMenuItems = classNames({
    desktop: true,
    mobile: false,
    open: false
  });

  const [{token}, dispatch] = useStore((store) => ({
    token: store.token
  }));

  const [mobileView, setMatches] = useState(window.matchMedia("(max-width: 576px)").matches)
  const [menuOpen, setMenuOpen] = useState(false); //mobile menu open/close state
  const [menuItemsClasses, setMenuItems] = useState(initMenuItems);

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
      .addEventListener('change', e => setMatches(e.matches))
  }, [])

  return (
    <div id="menu" className={menuItemsClasses} style={style}>
      <div id="left" >
        <span id="Author">{author}</span>
      </div>
      <div id="right" className={menuItemsClasses}> 
        <a href="https://status.gravy.cc/">Uptime</a>
        <a href="https://github.com/ViewableGravy">Github</a>
        <TLink to="/">Home</TLink>
        <TLink to="/blog">Blog</TLink>
        {
          !token 
            ? <TLink to="/login">Login</TLink>
            : <button onClick={() => logout(dispatch)}>Logout</button> 
        }
        {mobileView && <div id="close" onClick={() => setMenuOpen(!menuOpen)}></div>}
      </div>
      {
        mobileView &&
        <div className={"borger"} onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      }
    </div>
  )
}

export default Menu;