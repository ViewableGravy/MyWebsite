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
import { GlobalStateProvider, StoreProvider } from './functionality/globalState';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Overlay from './components/TransitionOverlay';
import Text from './components/text';

const useSocket = (path) => {
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:3002${path}`);

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [path]);

  return socket;
};

const useSocketEvent = (path) => {
  const [results, setResults] = React.useState(null);
  const socket = useSocket(path);

  React.useEffect(() => {
    if (!socket) return;

    socket.addEventListener('message', (event) => {
      setResults(event.data);
    });

    socket.onclose = () => {
      setResults(null);
    }

    return () => {
      socket.removeEventListener('message', (event) => {
        setResults(event.data);
      });
    }
  }, [socket]);

  return [results];
}

const useStatus = () => {
  const [status] = useSocketEvent('/api/status');
  
  return JSON.parse(status);
}

const MyStatus = () => {
  const status = useStatus();

  return status && (
      <div style={{ height: '700px' }}>{status.map((monitor, index) => (
        <p key={index}>
          <Text white span>{monitor.monitor_name} :</Text>
          <Text white span> {monitor.type},</Text>
          <Text white span> {monitor.status}</Text>
        </p>
      ))}</div>
  )

}

ReactDOM.render(
  <GlobalStateProvider>
    <StoreProvider>
      {/* eslint-disable-next-line no-undef */}
      <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY}>
        <React.StrictMode>
          <MyStatus />
          <Router>
            <Overlay>
              <Routes>
                <Route path='/' element={<Home />} />
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
    </StoreProvider>
  </GlobalStateProvider>,
  document.getElementById('root')
);
