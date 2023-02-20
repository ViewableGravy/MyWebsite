import React from 'react';
import { createUseStyles } from 'react-jss';
import { styles } from './style.js';
import { Menu } from '../blog/menu/menu';
import { useCallback, useEffect, useState } from 'react';

import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

import graphicTop from '../../assets/images/Graphic-Design-Transparent.png'

const useStyles = createUseStyles(styles);

export const Contact = () => {
  const classes = useStyles();
  const captchaRef = React.useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await captchaRef.current.executeAsync();
    captchaRef.current.reset();

    const server = process.env.REACT_APP_BACKEND_SERVER;
    const port = process.env.REACT_APP_BACKEND_PORT;
    const protocol = process.env.REACT_APP_BACKEND_PROTOCOL;
    const url = `${protocol}://${server}:${port}/api/contact`;

    try {
      const result = await axios.post(url, {
        name,
        email,
        message,
        captchaToken: token,
      });

      console.log(result)
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
                onChange={e => setName(e.target.value)} 
                required/>
            </div>
            <div className={classes.fieldContainer}>
              <input className={classes.field} 
              type='text' 
              name='email' 
              placeholder='Email Address' 
              pattern=".+@.+(\..+)+"
              title="Please enter a valid email address"
              onChange={e => setEmail(e.target.value)} 
              required/>
            </div>
            <div className={classes.fieldContainer}>
              <textarea
                className={`${classes.field} ${classes.textarea}`}
                name='message'
                rows='8' cols='20'
                placeholder='I think the website is pretty amazing but... so are potatoes'
                onChange={e => setMessage(e.target.value)}
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
