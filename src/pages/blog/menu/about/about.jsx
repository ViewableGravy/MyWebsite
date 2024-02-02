import React from 'react'
import Portrait from '../../../../assets/images/Lleyton.png'
import './about.scss'
import { Floater } from 'components/floater'

//todo, get this from database based on currently signed in user
export const About = ({ style }) => {
  if ( !style ) style = {}

  return (
    <Floater className="AboutComponent" clickable>
      <div style={style} className="AboutComponent__padder">
        <div className="circle">
          <img alt={'ViewableGravy Portrait'} src={Portrait}></img>
        </div>
        <p className={'about'}>
          Hi, my name is Lleyton but online you can call me Gravy. I&apos;m passionate about making things; right now that&apos;s in NodeJS and React. 
          Recently I&apos;m entertaining myself with WebSockets, Express API&apos;s and learning new SCSS & JSS skills but I also love Server Administration, automation and writing scripts. 
          I currently Work at <a className={'link magic-link'} href="https://ventraip.com.au/">VentraIP Australia</a> as a frontend Developer
        </p>
      </div>
    </Floater>
  )
}

export default About;