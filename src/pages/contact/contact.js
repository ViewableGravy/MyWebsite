import React, { useRef } from 'react';
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
  if (typeof(action.name) != 'string' && action.name) return state;
  if (typeof(action.email) != 'string' && action.email) return state;
  if (typeof(action.message) != 'string' && action.message) return state;
  if (!action.name && !action.email && !action.message) return state;

  return {...state, ...action}
}

const addMargin = ({current}, margin) => {
  if (!current) return;
  if (typeof(margin) !== 'number') return;

  current.style.marginLeft = `${margin}px`;
}

export const Contact = () => {
  const classes = useStyles();
  const captchaRef = React.useRef();

  const [state, updateState] = useReducer(reducer, { 
    name: '', 
    email: '', 
    message: ''
  });

  const emailField = useRef(null);
  const nameField = useRef(null);
  const messageField = useRef(null);
  const submitField = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await captchaRef.current.executeAsync();
    captchaRef.current.reset();

    addMargin(submitField, 10000);
    addMargin(messageField, -10000);
    addMargin(nameField, -10000);
    addMargin(emailField, 10000);

    //show sending animation
    return

    // eslint-disable-next-line no-unreachable
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await axios.post(url, {
        ...state,
        captchaToken: token,
      });

      //if success, show success animation and then bring back the contact field
      //if failure, show failure animation and then bring back the contact field
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
            <div className={classes.fieldContainer} ref={nameField}>
              <input className={classes.field} 
                type='text' 
                name='name' 
                placeholder='Full Name'
                onChange={e => updateState({name: e.target.value})}
                required/>
            </div>
            <div className={classes.fieldContainer} ref={emailField}>
              <input className={classes.field} 
              type='text' 
              name='email' 
              placeholder='Email Address' 
              pattern=".+@.+(\..+)+"
              title="Please enter a valid email address"
              onChange={e => updateState({email: e.target.value})} 
              required/>
            </div>
            <div className={classes.fieldContainer} ref={messageField}>
              <textarea
                className={`${classes.field} ${classes.textarea}`}
                name='message'
                rows='8' cols='20'
                placeholder='I think the website is pretty amazing but... so are potatoes'
                onChange={e => updateState({message: e.target.value})}
                required
              />
            </div>
            <div className={classes.fieldContainer} ref={submitField}>
              <button type='submit' className={classes.field}>Hold to send</button>
            </div>
            <ReCAPTCHA ref={captchaRef} sitekey={process.env.REACT_APP_SITE_KEY} size={'invisible'} />
          </form>
        </div>
      </div>
    </>
  )
}
