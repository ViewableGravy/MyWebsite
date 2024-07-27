import { Border } from "../../../components/utility/border"
import { Hover } from "../../../components/utility/hover"
import { Padding } from "../../../components/utility/padding"
import Text from "../../../components/utility/text"

export const ProfileTileFeature = ({ children }: { children: React.ReactNode }) => {
  return (
    <Hover>
      {({ hovered }) => (
        <Border type="shadow" all={hovered ? 2 : 1} radius={3} color='color_tertiary' className='ProfileTile__feature'>
          <Padding all={12}>
            <Text lead-1 remove-margin customColor="tertiary" bold>
              {children}
            </Text>
          </Padding>
        </Border>
      )}
    </Hover>
  )
}