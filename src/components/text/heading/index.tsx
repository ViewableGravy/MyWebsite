import React from "react";
import Text from "..";
import { THeadingProps } from "../types";
import { Switch } from "components/conditionalRender/conditionalRender";



const Heading = ({ children, level, ...props }: THeadingProps) => {
  const { 'remove-margin' : removeMargin } = props;

  const styles = { margin: removeMargin ? 0 : '' }
  const state = level.toString() as "1" | "2" | "3" | "4" | "5";

  return (
    <>
      <Text {...props}>
        <Switch state={state} onState={{
          1: <h1 style={styles}>{children}</h1>,
          2: <h2 style={styles}>{children}</h2>,
          3: <h3 style={styles}>{children}</h3>,
          4: <h4 style={styles}>{children}</h4>,
          5: <h5 style={styles}>{children}</h5>
        }}/>
      </Text>
    </>
  );
}

export default Heading;