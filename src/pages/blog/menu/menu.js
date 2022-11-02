import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import './menu.scss'
import { useGlobalState } from '../../../global';
import { logout } from '../../../logic/authentication';

// author: string
export const Menu = ({ author }) => {
  const navigate = useNavigate();
  const initMenuItems = classNames({
    desktop: true,
    mobile: false,
    open: false
  });

  const [state, dispatch] = useGlobalState();

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
    <div id="menu" className={menuItemsClasses}>
      <div id="left" >
        <span id="Author">{author}</span>
      </div>
      <div id="right" className={menuItemsClasses}> 
        {
          !state.token 
            ? <a onClick={() => navigate('/login')}>Login</a>
            : <a onClick={() => logout(dispatch)}>Logout</a> 
        }
        <a href="https://status.gravy.cc/">Uptime</a>
        <a href="https://github.com/ViewableGravy">github</a>
        <a onClick={() => navigate('/')}>Home</a>
        <a onClick={() => navigate('/blog')}>Posts</a>
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