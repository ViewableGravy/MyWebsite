import classNames from "classnames";
import React from "react";
import Padding from "../padding";
import Text from "../text";
import './_Box.scss';

type TBoxProps = {
  children: React.ReactNode,
  className?: string,
  loading: boolean[],
  errors:  string[],
  'no-border'?: boolean,
}

type TBox = React.FC<TBoxProps>

const Box: TBox = ({ children, className, loading = [], errors = [], 'no-border': noBorder }) => {
  const classes = classNames({
    'Box': true,
    'Box--loading': loading.some((load) => !!load),
    'Box--error': errors.some((error) => !!error),
    [`Box--no-border`]: !!noBorder
  })

  if (loading.some((load) => !!load))
    return (
      <div className={classes}>
        <Padding x-md y-md>
          <Text align-center size-xl secondary>
            Loading...
          </Text>
        </Padding>
      </div>
    );

  if (errors.some((error) => !!error))
    return (
      <div className={classes}>
        <Padding x-md y-md>
          <Text align-center size-md secondary>
            Oops! It looks like something went wrong. Try again or contact support
          </Text>
        </Padding>
      </div>
    ) 

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Box;