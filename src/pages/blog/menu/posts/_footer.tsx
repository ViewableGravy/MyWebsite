import { Socials } from "./_socials";

const getYear = () => {
  return new Date().getFullYear();
}

export const Footer = () => {
  return (
    <div className={"footer"}>
      <Socials/>
      <p className={'footer copyright'}>© {getYear()}. All rights reserved. Made by ViewableGravy</p>
    </div>
  )
}