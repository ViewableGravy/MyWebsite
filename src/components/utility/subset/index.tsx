/***** BASE IMPORTS *****/
import * as React from "react";

/***** COMPONENT START *****/
export const Subset = ({ children, count }) => {
  return React.Children.map(children, (child, index) => (
    index < count ? child : null
  ));
}