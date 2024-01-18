import { useState, useEffect } from 'react';
import classNames from 'classnames'
import './menu.scss'
import { useStore } from 'functionality/state/state';
import { logout } from '../../../functionality/authentication/authentication';
import { useMedia } from 'hooks/useMedia';
import { Link } from '@tanstack/react-router';

const initialClasses = classNames({
  desktop: true,
  mobile: false,
  open: false,
});

// author: string
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
  const [menuOpen, setMenuOpen] = useState(false); //mobile menu open/close state
  const [menuItemsClasses, setMenuItems] = useState(initialClasses);
  const [{token}, dispatch] = useStore((store) => ({
    token: store.token
  }));

  const menuClasses = classNames({
    [menuItemsClasses]: true,
    [className]: className,
  })

  useEffect(() => {
    setMenuItems(classNames({
      desktop: !['xs', 'sm'].includes(media),
      mobile: ['xs', 'sm'].includes(media),
      open: menuOpen,
    }))
  }, [media, menuOpen])

  return (
    <div id="menu" className={menuClasses} style={style}>
      <div id="left" >
        <span id="Author">{author}</span>
      </div>
      <div id="right" className={menuItemsClasses}> 
        <a href="https://status.gravy.cc/">Uptime</a>
        <a href="https://github.com/ViewableGravy">Github</a>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        {
          token 
            ? <Link to="/login">Login</Link>
            : <button onClick={() => logout(dispatch)}>Logout</button> 
        }
        {['xs', 'sm'].includes(media) && <div id="close" onClick={() => setMenuOpen(!menuOpen)}></div>}
      </div>
      {
        ['xs', 'sm'].includes(media) &&
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