import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.scss'
import { useGlobalState } from '../../functionality/globalState';
import { LoadingAnimation } from '../../components/loader/loadingAnimation';

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
  const [showLoading, setShowLoading] = useState(false);

  const Login = async () => {
    try {
      setShowLoading(true);
      const { data } = await axios.post(`${apiUrl}/login`, {
        email,
        password
      });
      
      dispatch({ token: data.access_token, username: data.username });
      navigate(-1);
    } catch (err) {
      if (err.response.status === 401) {
        alert('incorrect email or password');
        setShowLoading(false);
      }

      if (err.response.status === 408) {
        alert('timeout');
        setShowLoading(false);
      }
    }
  }
  
  return (
    <div className='component login'>
      <div className='center'>
        <div className='title'>
          <h1 className='login-title'>Gravy.cc</h1>
          <h2 className='login-description'>Login to Gravy.cc</h2>
        </div>
        <div className='form'>
          <button disabled className='google sso-button' onClick={() => {}}></button>
          <button disabled className='facebook sso-button' onClick={() => {}}></button>
          <div className="or-text-div"> 
            <span className='or-text-span'>
              Or
            </span>
          </div>
          <input type="text" placeholder='E-mail address' name="email" onChange={e => setEmail(e.target.value)} value={email}/>
          <input type="text" placeholder='Password' name="password" onChange={e => setPassword(e.target.value)} value={password}/>
          <Link to={{ pathname: '/' }} className='forgot-password'>
            <p>Forgot Password?</p>
          </Link>
          <button className='submit' onClick={() => Login()}>Login</button>
          <div className='loading-animation'>
            { showLoading && <LoadingAnimation diameter={100}></LoadingAnimation>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;