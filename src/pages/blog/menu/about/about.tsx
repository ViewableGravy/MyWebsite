import React from 'react'
import Portrait from '../../../../assets/images/Lleyton.png'
import './about.scss'
import { Floater } from 'components/floater'

//todo, get this from database based on currently signed in user
export const About = ({ style = {} }) => {
  return (
    <Floater className="AboutComponent" clickable>
      <div style={style} className="AboutComponent__padder">
        <div className="circle">
          <img alt={'ViewableGravy Portrait'} src={Portrait}></img>
        </div>
        <p className={'about'}>
          Hi, my name is Lleyton but online you can call me Gravy. I&apos;m passionate about making things; right now that&apos;s in Typescript and React. 
          Recently I&apos;ve I'm enjoying typescript and strongly typed libraries like Tanstack and Zod as well as hobbies like table tennis, automation, reverse proxies and scripting. 
          I currently Work at <a className={'link magic-link'} href="https://ventraip.com.au/">VentraIP Australia</a> as a frontend Developer
        </p>
      </div>
    </Floater>
  )
}

export default About;