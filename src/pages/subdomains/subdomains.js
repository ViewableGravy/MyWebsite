import React from 'react';
import { domains } from './subdomain-list';
import { Link } from 'react-router-dom'
import { Menu } from '../blog/menu/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faServer, faHome, faGlobe, faQuestionCircle, faQuestion } from '@fortawesome/free-solid-svg-icons'
import './subdomains.scss'

export const Subdomains = () => (
  <div>
    <Menu author="ViewableGravy" style={{
      maxWidth: 'min(80vw, 1800px)',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: '5rem',
    }}/>
    <div className='subdomains_wrapper'>
      <ul className='outer_list'> 
        {
          domains.map((el, subdomainIndex) => 
            <li 
              style={{ "--clr": el.color, opacity: el?.information?.disabled ? '50%' : "100%"}}
              key={subdomainIndex}
            >
              <a href={`https://${el.domain}${el.path}`} data-text={`${el.name}`}>
                {el.name}
              </a>
              {
                Object.keys(el.information).length > 0 &&
                  Object.keys(el.information).map((key, iconIndex) => {
                    iconIndex = iconIndex + 1;
                    if (key === "locked" && el.information[key] === true) {
                      return (
                        <IconWithHover icon={faLock} id={`lock-${subdomainIndex}`} index={iconIndex} key={iconIndex}>
                          <h2>MFA Enabled</h2>
                          <p>This domain is protected by 2FA and is not publicly accessible</p>
                        </IconWithHover>
                      )
                    } else if (key === "server") {
                      return (
                        <IconWithHover icon={getServerIcon(el.information[key])} id={`server-${subdomainIndex}`} index={iconIndex} key={iconIndex}>
                          <h2>{ mapServerToTitle(el.information[key]) }</h2>
                          <p>{ mapServerToDescription(el.information[key]) }</p>
                        </IconWithHover>
                      )
                    } else if (key === "shortDescription") {
                      return (
                        <IconWithHover icon={faQuestionCircle} id={`description-${subdomainIndex}`} index={iconIndex} key={iconIndex}>
                          <h2>About</h2>
                          <p>{ el.information[key] }</p>
                        </IconWithHover>
                      )
                    }
                    
                    return null;
                  })
              }
              <sub>{el.domain}</sub>
            </li>
          )
        }
      </ul>
      <p>Design from https://www.youtube.com/watch?v=I90no1eQ45E&t=93s</p>
    </div>
  </div>
);

/**
 * 
 * @param {icon} icon font awesome icon
 * @param {id} id id of the containing element to provide a unique class for the hover information
 * @param {index} index index of the icon to provide a unique class for the hover information as well as increment right position
 * @param {children} children children of the hover information
 * @returns 
 */
const IconWithHover = ({children, icon, id, index}) => {

  return (
    <div className={"padlock_icon_container"} style={{ right: `${index > 1 ? ((20 + 5) * index) - 13 : 10}px` }}>
      <FontAwesomeIcon
        icon={icon} 
        size='lg' 
        color={"--clr"} 
        className={"padlock_icon"} 
        onMouseLeave={(e) => {
          document.querySelector(`.${id}-${index}`).style.display = 'none';
        }}
        onMouseEnter={(e) => {
          document.querySelector(`.${id}-${index}`).style.display = 'block';
        }}
        onClick={(e) => {
          e.preventDefault();
          const display = document.querySelector(`.${id}-${index}`).style.display;
          
          if (display === 'block') {
            document.querySelector(`.${id}-${index}`).style.display = 'none';
          } else {
            document.querySelector(`.${id}-${index}`).style.display = 'block';
          }
        }}
      />
      <div className={`padlock_hover_information ${id}-${index}`}>
        {children}
      </div>
    </div>
  )
}

function getServerIcon(server) {
  switch(server) {
    case 'home':
      return faHome;
    case 'vps':
      return faServer;
    case 'other':
      return faGlobe;
    default:
      return faGlobe;
  }
}

function mapServerToTitle(server) {
  switch(server) {
    case 'home':
      return 'Home Server';
    case 'vps':
      return 'Cloud VPS';
    case 'other':
      return 'Other Server';
    default:
      return 'Other Server';
  }
}

function mapServerToDescription(server) {
  if (server === "home") {
    return "This service is hosted on a self-hosted machine, utilizing a reverse proxy to access my local network";
  } else if (server === "vps") {
    return "This service is hosted on a VPS, this is currently located at NextDC in Sydney";
  } else if (server === "other") {
    return "This service is hosted on a shared hosting or cloud hosting service, the location has not been specified";
  }
}

export default Subdomains;

