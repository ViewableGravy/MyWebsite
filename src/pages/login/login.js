import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
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
      { showLoading && <LoadingAnimation diameter={200}></LoadingAnimation>}
    </div>
  )
}

export default Login;