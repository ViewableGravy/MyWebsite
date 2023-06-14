
import ReactDOM from 'react-dom';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './index.css';

import { Home } from "./pages/home/home";
import { Blog } from "./pages/blog/blog";
import { BlogArticle } from "./pages/blog/article/article"
import { Subdomains } from "./pages/subdomains/subdomains";
import { Login } from './pages/login/login';
import { Contact } from './pages/contact/contact';

import { GlobalStateProvider } from './functionality/globalState';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

ReactDOM.render(
  <GlobalStateProvider>
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY}>
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/blog' element={<Blog/>} />
            <Route path='/blog/:article' element={<BlogArticle/>} />
            <Route path='/subdomains' element={<Subdomains/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </GoogleReCaptchaProvider>
  </GlobalStateProvider>,
  document.getElementById('root')
);
