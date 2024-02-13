import classNames from "classnames";
import { useMedia } from "hooks/useMedia";
import React from "react";
import { _ContentPair } from "./_contentPair";
import { _Image } from "./_image";
import { findChildren } from "./_helpers";

import './_AboutSection.scss';

const AboutSectionContext = React.createContext<{ imageSide: 'left' | 'right' }>({
  imageSide: 'left'
});
export const useAboutSectionContext = () => React.useContext(AboutSectionContext);

type TSection = React.FC<{ className?: string, children: React.ReactNode, imageSide: 'left' | 'right' }>;

/**
 * Expects Image and ContentPair as children
 */
const _AboutSection: TSection = ({ className, children, imageSide }) => {
    const isMobile = useMedia(['xs', 'sm']);
    const isTablet = useMedia(['md']);
  
    const _className = classNames('AboutSection__section', className, {
      'AboutSection__section--mobile': isMobile,
      'AboutSection__section--tablet': isTablet
    })
    const _children = React.Children.toArray(children);
  
    const validChildren = _children.every((child) => {
      if (typeof child !== 'object') return false;
      if (!('type' in child)) return false;
  
      const types = [ _ContentPair, _Image ] as any[];
      return types.includes(child.type);
    })
  
    if (!validChildren) throw new Error('AboutSection children must be of type ContentPair and Image');
  
    //order them correctly based on imageSide
    const [ image, contentPair ] = findChildren(children, [ _Image, _ContentPair ]);
  
    return (
      <div className={_className}>
        <AboutSectionContext.Provider value={{ imageSide }}>
          {imageSide === 'left' ? image : contentPair}
          {imageSide === 'left' ? contentPair : image}
        </AboutSectionContext.Provider>
      </div>
    )
  }
  
  export const AboutSection = Object.assign(_AboutSection, { 
    ContentPair: _ContentPair,
    Image: _Image 
  });