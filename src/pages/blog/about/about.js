import Portrait from '../../../assets/images/Lleyton.png'
import './about.scss'

//todo, get this from database based on currently signed in user
export const About = ({ style }) => {
  if ( !style ) style = {}

  return (
    <div style={style} className="AboutComponent">
      <div className="circle">
        <img alt={'ViewableGravy Portrait'} src={Portrait}></img>
      </div>
      <p className={'about'}>
        Hi, my name is Lleyton but online you can call my Gravy. I'm passionate about making things; right now that's in NodeJS and React but I have also dabbled with C# and Angular. 
        Recently I'm entertaining myself with WebSockets, Express API's and learning new SCSS & JSS skills but I also love Server Administration, automation and writing scripts. 
        I currently Work at <a className={'link magic-link'} href="https://ventraip.com.au/">VentraIP Australia</a> as a technical support Representative
      </p>
    </div>
  )
}

export default About;