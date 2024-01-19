import React, { useMemo } from "react";
import sockets from "hooks/sockets";

/***** PRIVATE COMPONENTS *****/
import { OwnVisitorMouse } from "./ownVisitorMouse";

/***** CONSTS *****/
import './_VisitorMice.scss';

/***** TYPE DEFINITIONS *****/
type TVisitorMice = React.FC<{
  children: React.ReactNode
}>

export const VisitorMice: TVisitorMice = ({ 
  children 
}) => {
  const username = useMemo(() => Math.random().toString(36).substring(7), []);
  const { data, isSuccess } = sockets.useMousePosition(username);

  const _data = [...data ?? [], {
    x: 400,
    y: 400,
    route: '/',
    username: 'testing-mouse'
  }] satisfies typeof data

  /*****RENDER *****/
  return (
    <>
      <div className="visitorMice">
        {isSuccess && (
          _data?.filter((mouse) => mouse.username !== username).map((mouse) => (
            <OwnVisitorMouse key={mouse.username} {...mouse} />
          ))
        )}
      </div>
      {children}
    </>
  )
}