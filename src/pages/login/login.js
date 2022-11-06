import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.scss'
import { useGlobalState } from '../../functionality/globalState';


import { LoadingAnimation } from '../../components/loader/loadingAnimation';
import loginImage from '../../assets/images/Lleyton.png';

const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
const apiUrl = `${protocol}://${server}:${port}/api`;

//on load should check if in cookies and then skip this page
export const Login = () => {
  let navigate = useNavigate();

  const [state, dispatch] = useGlobalState();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userIncorrect, setUserIncorrect] = useState('');
  const [passIncorrect, setPassIncorrect] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eyeState, setEyeState] = useState('far fa-eye-slash eyeball');

  const [showLoading, setShowLoading] = useState(false);
  const [loginText, setLoading] = useState('Login'); //loading animation

  useEffect(() => {
    if (showPassword) {
      setEyeState('far fa-eye eyeball');
    } else {
      setEyeState('far fa-eye-slash eyeball');
    }
  }, [showPassword]);

  const Login = async () => {
    try {
      setPassIncorrect('');
      setUserIncorrect('');
      
      if (!email || !password) {
        alert('Please enter email and password');
        return;
      }

      setShowLoading(true);

      const { data } = await axios.post(`${apiUrl}/login`, {
        email,
        password
      });
      
      dispatch({ token: data.access_token, username: data.username });
      navigate(-1);
    } catch (err) {
      if (!err.response) {
        alert('Network error');
        setShowLoading(false);
        return;
      }

      if (err.response?.status === 401) {
        console.log(err)
        if (err.response.data === 'Authentication Failed') {
          setPassIncorrect('incorrect');
        }

        if (err.response.data === 'User not found') {
          setUserIncorrect('incorrect')
        }

        setShowLoading(false);
      }
    }
  }

  useEffect(() => {
      const interval = setInterval(() => {
        setLoading(loadingText => {
          if (showLoading) {
            const fullState = ' . . . .'
            return loadingText.length !== fullState && loadingText !== 'Login'
              ? loadingText + ' .'
              : ' .'
          } else
            return 'Login'
        })
      }, 500);

      return () => clearInterval(interval);
  }, [showLoading]);
  
  return (
    <div className='login-page-outer'>
      <h1 className='title'>Sign in</h1>
      <div className='login-page-inner'>
        
        <img className='icon' src={loginImage}/>
        <input className={`${userIncorrect} username`} type='text' placeholder='E-mail Address' onChange={e => { setEmail(e.target.value); setUserIncorrect('')}} value={email}/>
        <div className='pass-container'>
          <input className={`${passIncorrect} password`} type={showPassword ? 'text' : 'password'} placeholder='Password' onChange={e => { setPassword(e.target.value); setPassIncorrect('')}} value={password}/>
          <i className={eyeState} id="togglePassword" onClick={() => setShowPassword(current => !current)}></i>
        </div>
        
        <div className='forgot-password-container'>
          <button className='forgot-password-button' onClick={() => navigate(-1)}>Forgot Password?</button>
        </div>
        
        
      </div>
      <button className='login-button' onClick={() => Login()}>{loginText}</button>
    </div>
  )
}

export default Login;