import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.scss'
import { useGlobalState } from '../../global';

const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';

const apiUrl = `${protocol}://${server}:${port}/api`;

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//on load should check if in cookies and then skip this page
export const Login = () => {
  let navigate = useNavigate();
  const storedJwt = localStorage.getItem('loginToken');

  const [state, dispatch] = useGlobalState();
  
  const [token, setToken] = useState(storedJwt || null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const Login = async () => {

    try {
      const { data } = await axios.post(`${apiUrl}/login`, {
        email: email,
        password: password
      });

      setToken(data.access_token);

      dispatch({ 
        token: data.access_token,
        username: data.username
      });

      localStorage.setItem('token', data.access_token);

      navigate(-1);
    } catch (err) {
      // let user know that there was other errors, e.g. wrong details or cannot connect to backend
      console.log(err);
    }
  };

  const refreshToken = async () => {
    //return token using existing one
  }
  
  return (
    <div className='component login'>
      <form>
        <label>
          Email:
          <input type="text" name="email" onChange={e => setEmail(e.target.value)} value={email}/>
        </label>
        <label>
          Password:
          <input type="text" name="password" onChange={e => setPassword(e.target.value)} value={password}/>
        </label>
      </form>
      
      <button onClick={() => Login()}/>
    </div>
  )
}

export default Login;