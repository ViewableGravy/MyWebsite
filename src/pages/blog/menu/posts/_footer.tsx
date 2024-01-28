import React from "react";
import Socials from "./_socials";

const getYear = () => {
  return new Date().getFullYear();
}

const Footer = () => {
  return (
    <div className={"footer"}>
      <Socials/>
      <p className={'footer copyright'}>© {getYear()}. All rights reserved. Made by ViewableGravy</p>
    </div>
  )
}

export default Footer;