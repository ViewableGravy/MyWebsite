import Menu from "pages/blog/menu/menu";
import { modes, getContent } from "./content";
import { AboutSection } from "./components/AboutSection";
import { useGreetings } from "./hooks";
import { CSSProperties, useState } from "react";
import classNames from "classnames";
import { useMedia } from "hooks/useMedia";
import { FlipToggle } from "pages/blog/menu/toggle/toggle";

import "./_About.scss"
import { bemBuilder } from "helpers/functions/bemBuilder";

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
  /***** HOOKS *****/
  const [mode, setMode] = useState(_mode);
  const isMobile = useMedia(['xs', 'sm']);

  const [, classGen] = bemBuilder('AboutPage')

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
    },
    contact: {
      className: classes.container,
      style: { 
        background: 'linear-gradient(90deg, hsla(33, 100%, 34%, 1) 0%, hsla(58, 75%, 35%, 1) 100%)',
        boxShadow: "#c0cb23 0px 0px 20px 0px"
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

      {/* Personal Overview 2.0 */}
      <AboutSection imageSide="right" className={classGen("personalContainer")}>
        <AboutSection.ContentPair heading={introduction.name} description={greeting + " " + introduction.description} />
        <AboutSection.Image src={introduction.profileImage} alt="Profile Image" offset={{ up: isMobile && 20, right: isMobile ? 15 : 10 }} />
      </AboutSection>

      {/* Employment 2.0 */}
      <AboutSection imageSide="left" className={classGen("employmentContainer")}>
        <AboutSection.Image src={employment.image} alt="VentraIP Logo" offset={{ up: isMobile && 20, left: isMobile && 5 }} />
        <AboutSection.ContentPair heading={employment.title} description={employment.description} />
      </AboutSection>

      {/* Programming 2.0 */}
      <AboutSection imageSide="right" className={classGen("programmingContainer")}>
        <AboutSection.Image src={programming.image} alt="Visual Studio Code Logo" offset={{ up: isMobile && 20 }} />
        <AboutSection.ContentPair heading={programming.title} description={programming.description} />
      </AboutSection>

      {/* Projects 2.0 */}
      <AboutSection imageSide="left" className={classGen("projectsContainer")}>
        <AboutSection.Image src={projects.image} alt="Lucid Logo" offset={{ up: 10 }} />
        <AboutSection.ContentPair heading={projects.title} description={projects.description} />
      </AboutSection>

      {/* Contact 2.0 */}
      <AboutSection imageSide="right" className={classGen("contactContainer")}>
        <AboutSection.ContentPair heading={contact.title} description={contact.description} />
        <AboutSection.Image src={contact.image} alt="Office365 Logo" />
      </AboutSection>
    </div>
  );
}