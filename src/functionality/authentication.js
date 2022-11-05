import axios from 'axios';

const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';

const apiUrl = `${protocol}://${server}:${port}/api`;

export const logout = (dispatch) => {
  dispatch({
    token: null,
    username: null
  });

  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [`${protocol}://${server}:${port}`];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin) && token) {
      config.headers.authorization = `Bearer ${token}`;
    }
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
  } catch (err) {
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

export const refreshOrExpireExistingtoken = async (dispatch) => {
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

export const updateAuthToken = (newValue) => {
  if (newValue.token) {
    localStorage.setItem("token", newValue.token);
  }
  if (newValue.username) {
    localStorage.setItem("username", newValue.username);
  }

  return newValue;
}
