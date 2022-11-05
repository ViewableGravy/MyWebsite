import React from 'react';
import './subdomains.scss'
import { domains } from './subdomain-list';
import { useNavigate } from 'react-router-dom'

export const Subdomains = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    
  }, [])
  
  return (
    <div className='subdomains_wrapper'>
      <a className='Home' style={{"--clr":'rgb(255,0,0)'}} onClick={() => navigate('/')}>Home</a>
      <p>Design from https://www.youtube.com/watch?v=I90no1eQ45E&t=93s</p>
      <ul className='outer_list'> {
          domains.map(el => 
            <li style={{"--clr":el.color}}>
              <a href={`https://${el.domain}${el.path}`} data-text={`${el.name}`}>{el.name}</a>
              <sub>{el.domain}</sub>
            </li>
          )
      } </ul>
    </div>
  )
}

export default Subdomains;

