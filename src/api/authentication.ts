import axios from "axios";
import { TDispatch } from "../functionality/globalState";

const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
const apiUrl = `${protocol}://${server}:${port}/api`;

// --------  API Types ----------- //

export type TRefreshToken = {
  token: string,
  username: string,
}

export type TAPIRefreshToken = {
  access_token: string,
  username: string,
}

export type TAPIRefreshTokenError = {
  error: true,
  message: string,
}

// --------  API requests ----------- //

export const Authentication = {
  getRefreshToken: async (): Promise<TRefreshToken | TAPIRefreshTokenError> => {
    return axios.post<TAPIRefreshToken>(`${apiUrl}/refreshToken`)
      .then(res => mapRefreshToken(res.data))
      .catch(error => {
        return {
          error: true,
          message: error,
        };
      });
  },

  login: async (data: {email: string, password: string}, dispatch: TDispatch) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const result = await axios.post(`${apiUrl}/login`, data, config)
      .then(res => mapLogin(res.data))
      .catch(error => {
        console.error(error);
        return {
          error: true,
          message: error,
        };
      });

    if ('error' in result) return result.message;

    dispatch(result);
    localStorage.setItem('token', result.token);
    localStorage.setItem('username', result.username);
  }
}

// --------  API to data ----------- //

const mapRefreshToken = ({ access_token, username}: TAPIRefreshToken): TRefreshToken => ({
  token: access_token,
  username,
});

const mapLogin = ({ access_token, username}: TAPIRefreshToken): TRefreshToken => ({
  token: access_token,
  username,
});



