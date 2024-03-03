import React from "react";

export const findChildren = <T extends Array<any>>(children: React.ReactNode, types: T): { [I in keyof T]: ReturnType<typeof findChild> } => {
  return types.map((type) => findChild(children, type)) as any;
}
  
const findChild = <T,>(children: React.ReactNode, type: T) => {
  const _children = React.Children.toArray(children);

  for (const child of _children) {
    if (React.isValidElement(child) && child.type === type) return child;
  }

  return null;
}