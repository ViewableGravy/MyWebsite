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
import { GlobalStateProvider } from './functionality/state/[LEGACY]state';
import { StoreProvider } from './functionality/state/state';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Overlay from './components/TransitionOverlay';
import Text from './components/text';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useStatus } from 'hooks/useStatus';
import Padding from 'components/padding';


const MyStatus = () => {
  const {
    data: status,
    isLoading
  } = useStatus();

  return !isLoading && (
      <div style={{ height: '700px' }}>{status.map((monitor, index) => (
        <p key={index}>
          <Text white span>{monitor.monitor_name} :</Text>
          <Text white span> {monitor.type},</Text>
          <Text white span> {monitor.status}</Text>
        </p>
      ))}</div>
  )
}

const queryClient = new QueryClient()


ReactDOM.render(
  <GlobalStateProvider>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line no-undef */}
        <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY}>
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
                  <Route path='/test/status' element={<MyStatus/>} />
                  <Route path='*' element={<Navigate to="/" />} />
                </Routes>
              </Overlay>
            </Router>
          </React.StrictMode>
        </GoogleReCaptchaProvider>
      </QueryClientProvider>
    </StoreProvider>
  </GlobalStateProvider>,
  document.getElementById('root')
);
