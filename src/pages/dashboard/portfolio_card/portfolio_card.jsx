import React from 'react';
import SpiceAndWolf from '../../../assets/YourNameHorizontal.png';
import emailSymbol from '../../../assets/Email-Symbol-PNG-Transparent-Picture.png'
import classes from './portfolio.module.css'

export const PortfolioCard = () => {
  return (
    <div>
      <img src={SpiceAndWolf} alt="test" className={classes.img}/>
      <div className={classes.separater}></div>
      <div className={classes.contentBackground}>
        <div className={classes.innerBorder}>
          <h2 className={classes.title}>LLEYTON MORRIS</h2>
          <h4 className={classes.position}>Software Developer</h4>
          <div>
            <img src={emailSymbol} alt="test" className={classes.emailImg}/>
            <p className={classes.emailText}>Insert Email</p>
          </div>
          <div></div>
          <div>
            <img src="" alt="test"/>
            <p>Insert Current Position</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioCard;

