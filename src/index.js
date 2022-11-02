
import ReactDOM from 'react-dom';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/home/home"
import { Blog } from "./pages/blog/blog"
import { BlogArticle } from "./pages/blog/article/article"
import { Subdomains } from "./pages/subdomains/subdomains";
import './index.css'
import { Login } from './pages/login/login';

import { GlobalStateProvider } from './global'

ReactDOM.render(
  <GlobalStateProvider>
    <React.StrictMode>
      <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/blog' element={<Blog/>} />
            <Route path='/blog/:article' element={<BlogArticle/>} />
            <Route path='/subdomains' element={<Subdomains/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
      </Router>
    </React.StrictMode>
  </GlobalStateProvider>,
  document.getElementById('root')
);
