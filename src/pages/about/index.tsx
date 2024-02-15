import React, { useState } from "react";
import classNames from "classnames";
import Menu from "pages/blog/menu/menu";
import { modes, getContent } from "./content";
import { AboutSection } from "./components/AboutSection";
import { useGreetings } from "./hooks";
import { useMedia } from "hooks/useMedia";
import { FlipToggle } from "pages/blog/menu/toggle/toggle";
import { bemBuilder } from "utilities/functions/bemBuilder";

import "./_About.scss"

type TAbout = React.FC<{
  _mode?: typeof modes[keyof typeof modes]
}>

export const About: TAbout = ({ _mode = modes.PROFESSIONAL }) => {
  /***** HOOKS *****/
  const [mode, setMode] = useState(_mode);
  const [base, classGen] = bemBuilder('AboutPage')
  const isMobile = useMedia(['xs', 'sm']);

  const {
    employment,
    introduction,
    programming,
    projects,
    contact
  } = getContent(mode);

  const greeting = useGreetings(introduction.greetings);

  const outerClassName = classNames(base, {
    [classGen(undefined, 'mobile')]: isMobile
  })

  /***** RENDER *****/
  return (
    <div className={outerClassName}>
      <Menu style={{ maxWidth: 800, marginInline: 'auto' }} author={"ViewableGravy"}/>

      <FlipToggle 
        className={classGen("toggle")}
        titleEnabled="Career" 
        titleDisabled="Casual" 
        onChange={() => setMode(mode === modes.PROFESSIONAL ? modes.CASUAL : modes.PROFESSIONAL)} 
        initialState={mode === modes.CASUAL} 
      />

      {/* Personal Overview */}
      <AboutSection imageSide="right" className={classGen("personalContainer")}>
        <AboutSection.ContentPair heading={introduction.name} description={greeting + " " + introduction.description} />
        <AboutSection.Image src={introduction.profileImage} alt="Profile Image" offset={{ up: isMobile && 20, right: isMobile ? 15 : 10 }} />
      </AboutSection>

      {/* Employment */}
      <AboutSection imageSide="left" className={classGen("employmentContainer")}>
        <AboutSection.Image src={employment.image} alt="VentraIP Logo" offset={{ up: isMobile && 20, left: isMobile && 5 }} />
        <AboutSection.ContentPair heading={employment.title} description={employment.description} />
      </AboutSection>

      {/* Programming */}
      <AboutSection imageSide="right" className={classGen("programmingContainer")}>
        <AboutSection.Image src={programming.image} alt="Visual Studio Code Logo" offset={{ up: isMobile && 20 }} />
        <AboutSection.ContentPair heading={programming.title} description={programming.description} />
      </AboutSection>

      {/* Projects */}
      <AboutSection imageSide="left" className={classGen("projectsContainer")}>
        <AboutSection.Image src={projects.image} alt="Lucid Logo" offset={{ up: 10 }} />
        <AboutSection.ContentPair heading={projects.title} description={projects.description} />
      </AboutSection>

      {/* Contact */}
      <AboutSection imageSide="right" className={classGen("contactContainer")}>
        <AboutSection.ContentPair heading={contact.title} description={contact.description} />
        <AboutSection.Image src={contact.image} alt="Office365 Logo" />
      </AboutSection>
    </div>
  );
}