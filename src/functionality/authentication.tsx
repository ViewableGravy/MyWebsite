import axios from 'axios';
import React from 'react';

const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';

const apiUrl = `${protocol}://${server}:${port}/api`;

export const logout = (dispatch: React.Dispatch<{ [key: string]: any }>) => {
  dispatch({
    token: null,
    username: null
  });

  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

const createAllowedOrigin = (server: any) => {
  if (!server) {
    return null;
  }

  const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
  const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
  return `${protocol}://${server}:${port}`;
}

axios.interceptors.request.use(
  (config : any) => {
    // const { origin } = new URL(config.url);
    // console.log(origin)
    // const allowedOrigins = [
    //   createAllowedOrigin(server), 
    //   createAllowedOrigin('gravy.cc'), 
    //   createAllowedOrigin('staging.gravy.cc'), 
    //   createAllowedOrigin('auth.gravy.cc')
    // ];
    const token = localStorage.getItem('token');
    // if (allowedOrigins.includes(origin) && token) {
    config.headers.authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const { data } = await axios.post(`${apiUrl}/refreshToken`);
    
    return [data, null];
  } catch (err: any) {
    if (err.response.status === 403) {
      return [null, 'forbidden'];
    }
    if (err.response.status === 401) {
      return [null, 'unauthorized'];
    }
    else {
      return [null, 'unknown error'];
    }
  }
};

export const refreshOrExpireExistingtoken = async (dispatch: React.Dispatch<{ [key: string]: any }>) => {
  const token = localStorage.getItem("token");

  if (!token) return logout(dispatch);

  const [data, err] = await refreshToken();
  
  if (err) logout(dispatch);
  if (data) {
    dispatch({
      token: data.access_token,
      username: data.username
    });
  }
}

export const updateAuthToken = (newValue: { token: string, username: string }) => {
  if (newValue.token) {
    localStorage.setItem("token", newValue.token);
  }
  if (newValue.username) {
    localStorage.setItem("username", newValue.username);
  }

  return newValue;
}
