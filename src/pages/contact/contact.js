import React from 'react';
import { createUseStyles } from 'react-jss';
import { styles } from './style.js';
import { Menu } from '../blog/menu/menu';
import { useCallback, useEffect, useState } from 'react';

import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

const useStyles = createUseStyles(styles);

export const Contact = () => {
  console.log(process.env.REACT_APP_SITE_KEY)
  console.log(process.env.REACT_APP_BACKEND_SERVER)
  console.log(process.env.REACT_APP_BACKEND_PORT)
  console.log(process.env.REACT_APP_BACKEND_PROTOCOL)

  const classes = useStyles();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");
  // const [authenticationToken, setAuthenticationToken] = useState("");

  const captchaRef = React.useRef();

  // const verifyCaptcha = useCallback(async (token) => {
  //   const server = process.env.REACT_APP_BACKEND_SERVER;
  //   const port = process.env.REACT_APP_BACKEND_PORT;
  //   const protocol = process.env.REACT_APP_BACKEND_PROTOCOL;
  //   const url = `${protocol}://${server}:${port}/api/verify-captcha`;

    

  //   const result = await axios.post(url, {token});

  //   setAuthenticationToken(result.data.submissionToken);

  //   console.log(result)

  //   return result.data.token;
  // },[]);

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
      })

      console.log(result)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <Menu author={"ViewableGravy"} style={styles.header} />
      <div className={classes.container}>
        <h1 className={classes.title}>Contact Me!</h1>
        <p className={classes.blurb}>I hope you are enjoying my website so far, I pour my passion into projects like this and would love to hear your thoughts on my works, what you loved and what you think I can improve on; Your feedback will also be welcome!</p>
        <div className={classes.contact}>
          <form onSubmit={handleSubmit}>
            <div className={classes.fieldContainer}>
              <input className={classes.field} type='text' name='name' placeholder='Full Name' onChange={e => setName(e.target.value)}/>
            </div>
            <div className={classes.fieldContainer}>
              <input className={classes.field} type='text' name='email' placeholder='Email Address' onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className={classes.fieldContainer}>
              <textarea 
                className={`${classes.field} ${classes.textarea}`} 
                name='message' 
                rows='8' cols='20' 
                placeholder='I think the website is pretty amazing but... so are potatoes' 
                onChange={e => setMessage(e.target.value)}
              />
            </div>
            <div className={classes.fieldContainer}>
              <button type='submit' className={classes.field}>Hold to send</button>
            </div>
            <ReCAPTCHA ref={captchaRef} sitekey={process.env.REACT_APP_SITE_KEY} size={'invisible'}/>
          </form>
        </div>
      </div>
    </>
  )
}
