/***** SHARED *****/
import { Anchor } from "../../../components/Anchor";
import { Hover } from "../../../components/utility/hover";
import Text from "../../../components/utility/text";

/***** TYPE DEFINITIONS *****/
type SpecialHover = React.FC<{
  children: React.ReactNode,
  href?: string
}>

/***** COMPONENT START *****/
export const SpecialHover: SpecialHover = ({ children, href }) => {
  /***** HOOKS *****/
  const { hovered } = Hover.useContext();

  /***** RENDER *****/
  return (
    <Anchor href={href ?? "#"} decoration='none'>
      <Text span customColor={hovered && "link"} className="ProfileTile__Special">
        {children}
      </Text>
    </Anchor>
  )
}