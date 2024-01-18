import { useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import sockets from "hooks/sockets";

const VisitorMouse = ({ x, y, username, route }: {
  x: number,
  y: number,
  username: string,
  route: string,
}) => {
  const { location: { pathname } } = useRouterState();
  const color = useMemo(() => Math.floor(Math.random()*16777215).toString(16), [username]);

  if (pathname !== route) return null;

  return (
    <FontAwesomeIcon 
      icon={faArrowPointer} 
      style={{ 
        position: "fixed", 
        left: x, 
        top: y, 
        color, 
        transition: 'all 0.3s ease-in-out'
      }} 
    />
  )
}

export const VisitorMice = ({ 
  children 
}: {
  children: React.ReactNode
}) => {
  const username = useMemo(() => Math.random().toString(36).substring(7), []);
  const { data, isSuccess } = sockets.useMousePosition(username);

  return (
    <>
      <div style={{ position: "fixed", userSelect: 'none', inset: '0 0 0 0', zIndex: 5, pointerEvents: 'none' }}>
        {isSuccess && (
          data?.filter((mouse) => mouse.username !== username).map((mouse) => (
            <VisitorMouse key={mouse.username} {...mouse} />
          ))
        )}
      </div>
      {children}
    </>
  )
}