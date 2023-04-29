import React from 'react';
import { domains } from './subdomain-list';
import { Link } from 'react-router-dom'
import { Menu } from '../blog/menu/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
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
          domains.map((el, index) => 
            <li 
              style={{ "--clr": el.color, opacity: el.disabled ? '50%' : "100%"}}
              key={index}
            >
              <a href={`https://${el.domain}${el.path}`} data-text={`${el.name}`}>
                {el.name}
              </a>
              <FontAwesomeIcon 
                icon={faLock} 
                size='lg' 
                color={"--clr"} 
                className={"padlock_icon"} 
                style={{ display: el.locked ? 'hidden' : 'none' }} 
              />
              <sub>{el.domain}</sub>
            </li>
          )
        }
      </ul>
      <p>Design from https://www.youtube.com/watch?v=I90no1eQ45E&t=93s</p>
    </div>
  </div>
);

export default Subdomains;

