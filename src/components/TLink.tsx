import React from "react";
import { useGlobalState } from "../functionality/state/[LEGACY]state";

type TTLinkProps = {
  to: string;
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
}

const TLink = ({ children, to, ...props }: TTLinkProps) => {
  const [, dispatch] = useGlobalState();

  return (
    <a 
      {...props} 
      onClick={() => {
        dispatch({ 
          transition: { 
            state: "start", 
            location: to 
          }
        })
      }}
    >
      {children}
    </a>
  )
}

export default TLink;