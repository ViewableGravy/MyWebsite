import React, { useState, useEffect } from 'react';
import './home.scss'
import { useNavigate } from 'react-router-dom'

import MadeInAbyss from '../../assets/images/home/MadeInAbyss.jpg'
import SpiceAndWolf from '../../assets/images/home/SpiceAndWolf_444.webp'
import WeatheringWithYou from '../../assets/images/home/WeatheringWithYouVertical_720.webp'

export const Home = () => {
  let navigate = useNavigate();
  // let webSocket = null; 
  
  const [ welcome, setWelcome ] = useState(true);
  // const [ song, setSong ] = useState(null);
  // const [ spotifyData, setSpotifyData ] = useState(null);

  // useEffect(() => {
  //   webSocket = new WebSocket('ws://localhost:3000/');

  //   webSocket.onmessage = (message) => {
  //     const data = JSON.parse(message.data);
  //     setSpotifyData(data);      
  //     setSong(data.item?.name || null);
  //   }

  //   return () => {
  //     console.log("removed test")
  //     webSocket.close();
  //   }
  // }, [])

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
          <ol>
            <li className='active' onClick={() => navigate('/subdomains')}>
              <img src={WeatheringWithYou} alt="test"/>
              <h1 className='title'>Subdomains</h1>
            </li>
            {/* <li className="ipod_outer">
              <div className="ipod">
                <div className="Screen" style={ { "backgroundImage" : `url(${spotifyData?.item?.album?.images[1]?.url})` } }>
                  <h3 className='title'>{song}</h3>
                </div>
                <div className="Controls">
                  <div className="Menu"></div>
                  <div>
                    <div className="Back"></div>
                    <div className="Middle"></div>
                    <div className="Forward"></div>
                  </div>
                  <div className="Pause"></div>
                </div>
              </div>
            </li> */}
            <li>
              <img src={MadeInAbyss} alt="test"/>
              <h1 className='title'>In Progress</h1>
            </li>
            <li className='active' onClick={() => navigate('/blog')}>
              <img src={SpiceAndWolf} alt="test"/>
              <h1 className='title'>Blog</h1>
            </li>
          </ol>
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