import React from "react";
// import { createRoot } from "react-dom";
import * as reactdomclient from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css';

import { Home } from "./pages/home/home";
import { Blog } from "./pages/blog/blog";
import { BlogArticle } from "./pages/blog/article/article"
import { Subdomains } from "./pages/subdomains/subdomains";
import { Login } from './pages/login/login';
import { Contact } from './pages/contact/contact';
import { GlobalStateProvider } from './functionality/state/[LEGACY]state';
import { StoreProvider } from './functionality/state/state';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Overlay from './components/TransitionOverlay';
import { QueryClient, QueryClientProvider } from 'react-query';
import { About } from "pages/about";

const queryClient = new QueryClient()

const container = document.getElementById('root') as HTMLElement;
const root = reactdomclient.createRoot(container);

root.render(
  <GlobalStateProvider>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_APP_SITE_KEY as string}>
          <React.StrictMode>
            <Router>
              <Overlay>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/blog' element={<Blog/>} />
                  <Route path='/blog/:article' element={<BlogArticle/>} />
                  <Route path='/subdomains' element={<Subdomains/>} />
                  <Route path='/login' element={<Login/>} />
                  <Route path='/contact' element={<Contact/>} />
                  <Route path='/testing' element={<About />} />
                  <Route path='*' element={<Navigate to="/" />} />
                </Routes>
              </Overlay>
            </Router>
          </React.StrictMode>
        </GoogleReCaptchaProvider>
      </QueryClientProvider>
    </StoreProvider>
  </GlobalStateProvider>
);