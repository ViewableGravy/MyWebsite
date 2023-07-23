import React, { useState, useEffect } from 'react';
import './loader.scss';

export const LoadingAnimation = ({ diameter }) => {
  const [loadingText, setLoadingText] = useState('Loading');
  
  const style = {
    width: '100px',
    height: '100px'
  }

  if (diameter) {
    style.width = `${diameter}px`;
    style.height = `${diameter}px`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(loadingText => {
        return loadingText.length < 10
          ? loadingText + '.'
          : 'Loading'
      })
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='loading_container'>
      <div className='spinning_container' style={style}>
        <div className='loading inner'/>
        <div className='loading middle'/>
        <div className='loading outer'/>
      </div>
      <p style={{left: diameter/2, "fontSize": diameter/6}}>{loadingText}</p>
    </div>
  );  
};

export default LoadingAnimation;