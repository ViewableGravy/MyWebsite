
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
import { useGlobalState } from './functionality/globalState';
import { useNavigate } from 'react-router-dom';

const Overlay = ({ children }) => {
  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();

  const [transition, setTransition] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  React.useEffect (() => {
    console.log(state)
  }, [state])

  const unHide = () => {
    setTimeout(() => {
      setHidden(false);
    }, 100);
  };

  const hide = () => {
    setTimeout(() => {
      setHidden(true);
    }, 400);
  };

  const stopTransition = () => {
    setTimeout(() => {
      setTransition(false);
      hide();
    }, 100);
  };

  const changePage = (location) => {
    setTransition(true);
    dispatch({ startTransition: {state: "transitioning"}});

    setTimeout(() => {
      navigate(location);
      stopTransition();
    }, 400);
  };

  React.useEffect(() => {
    const transitionState = state?.transition?.state;

    if (transitionState !== "start") return;

    unHide();
  }, [state]);

  React.useEffect(() => {
    if (hidden) return;

    changePage(state?.transition?.location);
  }, [hidden]);

  return (
    <>
      {children}
      <div className={`overlay ${transition ? 'active' : ''}`} style={{ display: hidden ? 'none' : '' }} />
    </>
  )
};

ReactDOM.render(
  <GlobalStateProvider>
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY}>
      <React.StrictMode>
          <Router>
            <Overlay>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/blog' element={<Blog/>} />
                <Route path='/blog/:article' element={<BlogArticle/>} />
                <Route path='/subdomains' element={<Subdomains/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='*' element={<Navigate to="/" />} />
              </Routes>
            </Overlay>
          </Router>
      </React.StrictMode>
    </GoogleReCaptchaProvider>
  </GlobalStateProvider>,
  document.getElementById('root')
);
