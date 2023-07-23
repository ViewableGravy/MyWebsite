import axios from 'axios';
import { TStore } from '../globalState';
// import { getRefreshToken } from './api';

import API from '../../api/global';

export const logout = (dispatch: (value: Partial<TStore>) => void) => {
  dispatch({
    token: null,
    username: null
  });

  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

axios.interceptors.request.use(
  (config : any) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const refreshOrExpireExistingtoken = async (dispatch: (value: Partial<TStore>) => void) => {
  const token = localStorage.getItem("token");
  if (!token) 
    return logout(dispatch);

  const result = await API.Authentication.getRefreshToken();

  if ('error' in result)
    return logout(dispatch);

  if ('token' in result) {
    dispatch({
      token: result.token,
      username: result.username
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
