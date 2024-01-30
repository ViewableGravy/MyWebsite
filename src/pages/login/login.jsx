import React, { useState, useEffect } from 'react';
import { useStore } from 'functionality/state/state';
import API from '../../api/global';
import './login.scss'

import loginImage from '../../assets/images/Lleyton.png';
import { useNavigate, useRouter } from '@tanstack/react-router';

//on load should check if in cookies and then skip this page
export const Login = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStore(() => ({}));

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userIncorrect, setUserIncorrect] = useState('');
  const [passIncorrect, setPassIncorrect] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eyeState, setEyeState] = useState('far fa-eye-slash eyeball');

  useEffect(() => {
    if (showPassword) {
      setEyeState('far fa-eye eyeball');
    } else {
      setEyeState('far fa-eye-slash eyeball');
    }
  }, [showPassword]);

  const login = async () => {
    try {
      setPassIncorrect('');
      setUserIncorrect('');
      
      if (!email || !password) {
        alert('Please enter email and password');
        return;
      }

      await API.Authentication.login({email, password}, dispatch);

      console.log('here')

      navigate({ to: "/" })
      // router.history.back();
    } catch (err) {
      if (!err.response) {
        alert('Network error');
        return;
      }

      if (err.response?.status === 401) {
        if (err.response.data === 'Authentication Failed') {
          setPassIncorrect('incorrect');
        }

        if (err.response.data === 'User not found') {
          setUserIncorrect('incorrect')
        }
      }
    }
  }
  
  return (
    <div className='login-page-outer'>
      <h1 className='title'>Sign in</h1>
      <div className='login-page-inner'>
        
        <img className='icon' src={loginImage}/>
        <input 
          className={`${userIncorrect} username`} 
          type='text' 
          placeholder='E-mail Address' 
          onChange={ e => { 
            setEmail(e.target.value); 
            setUserIncorrect('')}
          } 
          onKeyDown={e => e.key === "Enter" && login()}
          value={email}/>
        <div className='pass-container'>
          <input 
            className={`${passIncorrect} password`} 
            type={showPassword ? 'text' : 'password'} 
            placeholder='Password' 
            onChange={ e => { 
              setPassword(e.target.value); 
              setPassIncorrect('')}
            } 
            onKeyDown={e => e.key === "Enter" && login()}
            value={password}/>
          <i className={eyeState} id="togglePassword" onClick={() => setShowPassword(current => !current)}></i>
        </div>
        <div className='forgot-password-container'>
          <button className='forgot-password-button' onClick={() => navigate({ to: '/' })}>Forgot Password?</button>
        </div>
      </div>
      <button className='login-button' onClick={login}>Login</button>
    </div>
  )
}

export default Login;