import React, { useState, useEffect } from 'react';
import './home.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import MadeInAbyss from '../../assets/images/home/MadeInAbyss.jpg'
import SpiceAndWolf from '../../assets/images/home/SpiceAndWolf_444.webp'
import WeatheringWithYou from '../../assets/images/home/WeatheringWithYouVertical_720.webp'

export const Home = () => {
  let navigate = useNavigate();
  
  const [ welcome, setWelcome ] = useState(true);

  useEffect(() => {
    const state = localStorage.getItem('welcome');
    if (state) return setWelcome(false);

    localStorage.setItem('welcome', false);

    document.addEventListener('keydown', incrementState)
    document.addEventListener("mousedown", incrementState);

    return () => {
      document.removeEventListener('keydown', incrementState)
      document.removeEventListener("mousedown", incrementState);
    }
  }, [])
  
  const incrementState = () => {
    setWelcome(false);
    localStorage.setItem('welcome', true);
    document.removeEventListener('keydown', incrementState);
    document.removeEventListener("mousedown", incrementState);
  }

  const main = () => { 
    return (
      <div className='home_outer'>
        <div className='background'>
          <div>
            <Link className='active' to={'/subdomains'}>
              <img src={WeatheringWithYou} alt="test"/>
              <h1 className='title'>Subdomains</h1>
            </Link>
            <Link className={'active'} to={'/contact'}>
              <img src={MadeInAbyss} alt="test"/>
              <h1 className='title'>Contact Me</h1>
            </Link>
            <Link className='active' to={'/blog'}>
              <img src={SpiceAndWolf} alt="test"/>
              <h1 className='title'>Blog</h1>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  const init = () => {
    return (
      <div className='home_outer'>
        <div className='InitDiv'>
          <div className='InitOuterCenter'>
            <h1 className='InitH1'>Welcome</h1>
            <p className='InitP'>Press any button to continue</p>
          </div>
        </div>
      </div>
    )
  }
  
  return welcome ? init() : main();
}

export default Home;