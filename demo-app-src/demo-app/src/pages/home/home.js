import React, { useState } from 'react';
import SpiceAndWolf from '../../assets/SpiceAndWolf.jpg';
import WeatheringWithYou from '../../assets/WeatheringWithYouVertical.jpg'
import classes from './home.module.css'
import { PortfolioCard } from './portfolio_card/portfolio_card'

export const Home = () => {
  React.useEffect(() => {
    document.addEventListener('keydown', incrementState)
    document.addEventListener("mousedown", incrementState);

    return () => {
      document.removeEventListener('keydown', incrementState)
      document.removeEventListener("mousedown", incrementState);
    }
  }, []) //something about mount and unmount

  const [ welcome, setState ] = useState(true);
  
  const incrementState = () => {
    setState(false);
    document.removeEventListener('keydown', incrementState);
    document.removeEventListener("mousedown", incrementState);
  }
  
  return welcome ? init() : main();
}

const main = () => { 
  return (
    <div className={classes.background}>
      <ol>
        {/* <li>
          <PortfolioCard></PortfolioCard>
        </li> */}
        <li>
          <img src={WeatheringWithYou} alt="test" className={classes.img}/>
          <h1>Skill-Tree</h1>
        </li>
        <li>
          <img src={WeatheringWithYou} alt="test" className={classes.img}/>
          <h1>Skill-Tree</h1>
        </li>
        <li>
          <img src={SpiceAndWolf} alt="test" className={classes.img}/>
          <h1 className={classes.title}>About Me</h1>
        </li>
      </ol>
    </div>
  )
}

const init = () => {
    return (
      <div className={classes.InitDiv}>
        <div className={classes.InitOuterCenter}>
          <h1 className={classes.InitH1} >Welcome</h1>
          <p className={classes.InitP} >Press any button to continue</p>
        </div>
      </div>
    )
  }

export default Home;

