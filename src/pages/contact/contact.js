import React from 'react';
import { createUseStyles } from 'react-jss';
import { styles } from './style.js';
import { Menu } from '../blog/menu/menu';
import { useReducer } from 'react';

import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import graphicTop from '../../assets/images/Graphic-Design-Transparent.png'

const server = process.env.REACT_APP_BACKEND_SERVER;
const port = process.env.REACT_APP_BACKEND_PORT;
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL;
const url = `${protocol}://${server}:${port}/api/contact`;

const useStyles = createUseStyles(styles);
const reducer = (state, action) => {
  if (typeof(action.name) != 'string' && !!action.name) return state;
  if (typeof(action.email) != 'string' && !!action.email) return state;
  if (typeof(action.message) != 'string' && !!action.message) return state;
  if (!action.name && !action.email && !action.message) return state;

  return {...state, ...action}
}

export const Contact = () => {
  const classes = useStyles();
  const captchaRef = React.useRef();

  const [state, updateState] = useReducer(reducer, { 
    name: '', 
    email: '', 
    message: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await captchaRef.current.executeAsync();
    captchaRef.current.reset();

    try {
      const result = await axios.post(url, {
        ...state,
        captchaToken: token,
      });
    } catch (error) {
      console.log('An error has occured, information below:\n' + error)
    }

  }

  return (
    <>
      <Menu author={"ViewableGravy"} style={styles.header} />
      <div className={classes.container}>
        <div style={{position: 'relative'}}>
          <h1 className={classes.title}>Contact Me!</h1>
          <p className={classes.blurb}>
            I hope you are enjoying my website so far, I pour my passion into projects like this
            and would love to hear your thoughts on my works, what you loved and what you think
            I can improve on; Your feedback will always be welcome!
          </p>
          <img src={graphicTop} alt="contact-background" className={classes.contactBackground} />
        </div>
        <div className={classes.contact}>
          <form onSubmit={handleSubmit}>
            <div className={classes.fieldContainer}>
              <input className={classes.field} 
                type='text' 
                name='name' 
                placeholder='Full Name'
                onChange={e => updateState({name: e.target.value})}
                required/>
            </div>
            <div className={classes.fieldContainer}>
              <input className={classes.field} 
              type='text' 
              name='email' 
              placeholder='Email Address' 
              pattern=".+@.+(\..+)+"
              title="Please enter a valid email address"
              onChange={e => updateState({email: e.target.value})} 
              required/>
            </div>
            <div className={classes.fieldContainer}>
              <textarea
                className={`${classes.field} ${classes.textarea}`}
                name='message'
                rows='8' cols='20'
                placeholder='I think the website is pretty amazing but... so are potatoes'
                onChange={e => updateState({message: e.target.value})}
                required
              />
            </div>
            <div className={classes.fieldContainer}>
              <button type='submit' className={classes.field}>Hold to send</button>
            </div>
            <ReCAPTCHA ref={captchaRef} sitekey={process.env.REACT_APP_SITE_KEY} size={'invisible'} />
          </form>
        </div>
      </div>
    </>
  )
}
