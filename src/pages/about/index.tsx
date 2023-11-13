import Menu from "pages/blog/menu/menu";
import { modes, getContent } from "./content";
import { useGreetings } from "./hooks";
import { useState } from "react";

import "./_About.scss"
import classNames from "classnames";

const classes = {
  outer: 'aboutPage',
  container: 'container',
  text: {
    container: (position: 'right' | 'left') => classNames('textContainer', {
      'textContainer__right': position === 'right',
      'textContainer__left': position === 'left'
    }),
    name: 'name',
    description: 'description'
  },
  image: {
    container: 'imageContainer',
    image: 'image'
  }
} as const;

type TProps = {
  _mode?: typeof modes[keyof typeof modes]
}

export const About = ({ 
  _mode = modes.PROFESSIONAL 
}: TProps) => {
  const [mode, setMode] = useState(_mode);

  const {
    name,
    description,
    greetings,
    profileImage
  } = getContent(mode);

  const greeting = useGreetings(greetings);

  return (
    <div className={classes.outer} style={{
      paddingInline: 50
    }}>
      <Menu style={{ maxWidth: 800, marginInline: 'auto' }} author={"ViewableGravy"}/>

      <button onClick={() => setMode(mode === modes.PROFESSIONAL ? modes.CASUAL : modes.PROFESSIONAL)}>Toggle Mode</button>

      <section className={classes.container}>
        <div className={classes.text.container('right')}>
          <h1 className={classes.text.name}>{name}</h1>
          <p className={classes.text.description}>{greeting} {description}</p>
        </div>
        <div className={classes.image.container}>
          <img className={classes.image.image} src={profileImage} />
        </div>
      </section>

      <section className={classes.container} style={{ 
        background: 'linear-gradient(61deg, rgba(0,255,44,1) 0%, rgba(0,239,255,1) 100%)',
        boxShadow: "rgba(0, 242, 255, 0.65) 0px 0px 20px 0px"
      }}>
        <p>Ultimately my goal here is to burn out your retinas with these pretty bright colours. I&apos;ve stared into the abyss long enough at this point</p>
      </section>

      <section className={classes.container}>
        
      </section>
    </div>
  );
}