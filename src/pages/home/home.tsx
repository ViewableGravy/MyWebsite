import { useState, useEffect } from 'react';
import './home.scss'

import BlogImage from 'assets/images/home/blog_test_2.webp';
import ContactImage from '../../assets/images/home/contact_me.webp';
import SubdomainsImage from '../../assets/images/home/subdomains.webp';
import { Link } from '@tanstack/react-router';

export const Home = () => {
  const [ welcome, setWelcome ] = useState(true);

  useEffect(() => {
    const state = localStorage.getItem('welcome');
    if (state) return setWelcome(false);

    localStorage.setItem('welcome', 'false');

    document.addEventListener('keydown', incrementState)
    document.addEventListener("mousedown", incrementState);

    return () => {
      document.removeEventListener('keydown', incrementState)
      document.removeEventListener("mousedown", incrementState);
    }
  }, [])
  
  const incrementState = () => {
    setWelcome(false);
    localStorage.setItem('welcome', "true");
    document.removeEventListener('keydown', incrementState);
    document.removeEventListener("mousedown", incrementState);
  }

  const main = (): JSX.Element => { 
    return (
      <>
        <div className='home_outer'>
          <div className='background'>
            <div>
              <Link className='active' to={'/subdomains'}>
                <img src={SubdomainsImage} alt="test"/>
                <h1 className='title first'>Services</h1>
              </Link>
              <Link className={'active'} to={'/contact'}>
                <img src={ContactImage} alt="test"/>
                <h1 className='title second'>Contact</h1>
              </Link>
              <Link className='active' to={'/blog'}>
                <img src={BlogImage} alt="test"/>
                <h1 className='title third'>Blog</h1>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  const init = (): JSX.Element => {
    return (
      <div className='home_outer'>
        <div className='InitDiv'>
          <div className='InitOuterCenter'>
            <h1 className='InitH1'>Welcome</h1>
            <p className='InitP'>Press any button to continue</p>
          </div>
        </div>
      </div>
    );
  }
  
  return welcome ? init() : main();
}

export default Home;