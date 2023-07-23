import React from "react";
import Text from "..";
import { THeadingProps } from "../types";

const Heading = ({ children, level, ...props }: THeadingProps) => {
  const { 'remove-margin' : removeMargin } = props;

  const styles = { margin: removeMargin ? 0 : '' }

  return (
    <Text {...props}>
      {level === 1 && <h1 style={styles}>{children}</h1>}
      {level === 2 && <h2 style={styles}>{children}</h2>}
      {level === 3 && <h3 style={styles}>{children}</h3>}
      {level === 4 && <h4 style={styles}>{children}</h4>}
      {level === 5 && <h5 style={styles}>{children}</h5>}
    </Text>
  );
}

export default Heading;