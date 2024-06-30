
import classNames from 'classnames'
import './_Shine.scss'

type Shine = React.FC<{
  children: React.ReactNode,
  "allow-overflow"?: boolean,
  "full-height"?: boolean
}>

export const Shine: Shine = ({ 
  children, 
  "allow-overflow": allowOverflow,
  "full-height": fullHeight
}) => {
  const className = classNames("Shine", {
    "Shine--allow-overflow": allowOverflow,
    "Shine--full-height": fullHeight
  })

  return (
    <div className={className}>
      {children}
    </div>
  )
}