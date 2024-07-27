/***** SHARED *****/
import { Anchor } from "../../../components/Anchor"
import Flex from "../../../components/utility/flex"
import { Padding } from "../../../components/utility/padding"
import Text from "../../../components/utility/text"
import { Hover } from "../../../components/utility/hover"

/***** COMPONENTS *****/
import { ProfileTileFeature } from "./feature"
import { SpecialHover } from "../components/specialHover"

/***** CONSTS *****/
import { Icons } from "../../blog/menu/posts/_socials"
import ProfileImage from 'assets/images/Lleyton.png'
import './_ProfileTile.scss'

const specialNexigen = <SpecialHover href="https://nexigen.digital/">Nexigen Digital</SpecialHover>;
const specialTanstack = <SpecialHover href="https://tanstack.com/">Tanstack</SpecialHover>;
const specialReact = <SpecialHover href="https://reactjs.org/">React</SpecialHover>;
const specialTypescript = <SpecialHover href="https://www.typescriptlang.org/">Typescript</SpecialHover>;

/***** COMPONENT START *****/
export const ProfileTile = () => {
  return (
    <div className='ProfileTile'>
      <img className="ProfileTile__avatar" src={ProfileImage} />
      <Padding margin block="medium" >
        <Text.Heading lead-1 size-lg remove-margin level={2}>Lleyton Morris</Text.Heading>
      </Padding>
      <Text customColor='tertiary' remove-margin bold>ViewableGravy</Text>
      <Hover>
        <Text lead-md secondary>
          Lleyton is a frontend software developer at {specialNexigen} with a passion for 
          {specialTypescript} and everything {specialTanstack}. He's focused on becoming the best type 
          developer possible and is always looking to improve his skills in writing maintainable
          and modern {specialReact} code. His website is a mishmash of unfinished ideas, but it's a
          great way to see what he's up to.
        </Text>
      </Hover>
      <Flex gap={2}>
        <Anchor decoration='none' href='https://github.com/ViewableGravy'>
          <Flex align-center>
            <Icons.Github height={16} /> Github
          </Flex>
        </Anchor>
        <Anchor decoration='none' href='https://twitter.com/ViewableGravy'>
          <Flex align-center>
            <Icons.Twitter height={16} /> Twitter
          </Flex>
        </Anchor>
        <Anchor decoration='none' href='https://www.linkedin.com/in/lleyton-morris-20540b192/'>
          <Flex align-center>
            <Icons.LinkedIn height={16} /> LinkedIn
          </Flex>
        </Anchor>
      </Flex>
      <Padding margin top={20}>
        <Flex direction-col gap={2}>
          <ProfileTileFeature>Typescript</ProfileTileFeature>
          <ProfileTileFeature>Tanstack</ProfileTileFeature>
          <ProfileTileFeature>Self Hoster</ProfileTileFeature>
          <ProfileTileFeature>Coming Soon</ProfileTileFeature>
        </Flex>
      </Padding>
    </div>
  )
}
