import Menu from "pages/blog/menu/menu";
import { modes, getContent } from "./content";
import { useGreetings } from "./hooks";
import { CSSProperties, useState } from "react";

import "./_About.scss"
import classNames from "classnames";
import { useStore } from "functionality/state/state";
import { useMedia } from "hooks/useMedia";
import { FlipToggle } from "pages/blog/menu/toggle/toggle";

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
  const isMobile = useMedia(['xs', 'sm']);

  const {
    employment,
    introduction,
    programming,
    projects,
    contact
  } = getContent(mode);

  const greeting = useGreetings(introduction.greetings);

  const sectionProps = {
    personal: {
      className: classes.container
    },
    employment: {
      className: classes.container,
      style: { 
        background: 'linear-gradient(61deg, rgba(0,255,44,1) 0%, rgba(0,239,255,1) 100%)',
        boxShadow: "rgba(0, 242, 255, 0.65) 0px 0px 20px 0px"
      } as CSSProperties
    },
    programming: {
      className: classes.container,
      style: { 
        background: 'linear-gradient(90deg, hsla(192, 80%, 51%, 1) 0%, hsla(355, 85%, 63%, 1) 100%)',
        boxShadow: "#d36071 0px 0px 20px 0px"
      } as CSSProperties
    },
    projects: {
      className: classes.container,
      style: { 
        background: 'linear-gradient(90deg, hsla(280, 84%, 41%, 1) 0%, hsla(218, 97%, 56%, 1) 100%)',
        boxShadow: "#7423cb 0px 0px 20px 0px"
      } as CSSProperties
    }
  } as const;

  return (
    <div className={classes.outer}>
      <Menu style={{ maxWidth: 800, marginInline: 'auto' }} author={"ViewableGravy"}/>

      <FlipToggle 
        className="aboutPage__toggle" 
        titleEnabled="Career" 
        titleDisabled="Casual" 
        onChange={() => setMode(mode === modes.PROFESSIONAL ? modes.CASUAL : modes.PROFESSIONAL)} 
        initialState={mode === "CASUAL"} 
      />

      {/* Personal Overview */}
      <section {...sectionProps.personal}>
        <div className={classes.text.container('right')}>
          <h1 className={classes.text.name}>{introduction.name}</h1>
          <p className={classes.text.description}>{greeting} {introduction.description}</p>
        </div>
        <div className={classes.image.container}>
          <img className={classes.image.image} src={introduction.profileImage} />
        </div>
      </section>

      {/* Employment */}
      <section {...sectionProps.employment}>
        <div className={classes.image.container}>
          <img className={classes.image.image} src={employment.image} />
        </div>
        <div className={classes.text.container('left')}>
          <h1 className={classes.text.name}>{employment.title}</h1>
          <p className={classes.text.description} style={{ color: 'rgb(73 73 73)' }}>
            {employment.description}
          </p>
        </div>
      </section>

      {/* Programming */}
      <section {...sectionProps.programming}>
        <div className={classes.text.container('right')} style={{ marginRight: -20 }}>
          <h1 className={classes.text.name}>{programming.title}</h1>
          <p className={classes.text.description} style={{ color: 'white' }}>
            {programming.description}
          </p>
        </div>
        <div className={classes.image.container}>
          <img className={classes.image.image} src={programming.image} style={{ height: 'clamp(110px, 22vw, 280px)', marginRight: 15, marginTop: isMobile ? 0 : -30 }}/>
        </div>
      </section>

      {/* Projects */}
      <section {...sectionProps.projects}>
        <div className={classes.image.container}>
          <img className={classes.image.image} src={projects.image} style={{ height: 'clamp(120px, 24vw, 280px)', marginRight: isMobile ? 10 : 20, marginTop: isMobile ? 20 : -30 }} />
        </div>
        <div className={classes.text.container('left')}>
          <h1 className={classes.text.name}>{projects.title}</h1>
          <p className={classes.text.description}>
            {projects.description}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section {...sectionProps.programming}>
        <div className={classes.text.container('right')} style={{ marginRight: -20 }}>
          <h1 className={classes.text.name}>{contact.title}</h1>
          <p className={classes.text.description} style={{ color: 'white' }}>
            {contact.description}
          </p>
        </div>
        <div className={classes.image.container}>
          <img className={classes.image.image} src={contact.image} style={isMobile ? { marginRight: -40, height: 150} : { marginTop: -70, marginRight: -90, marginLeft: -100 }}/>
        </div>
      </section>
    </div>
  );
}