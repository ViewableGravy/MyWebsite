import { useRouterState } from "@tanstack/react-router";
import React, { CSSProperties, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import sockets from "hooks/sockets";
import { ContextMenu } from "./contextMenu";

import './_VisitorMice.scss';

const VisitorMouse = ({ x, y, username, route }: {
  x: number,
  y: number,
  username: string,
  route: string,
}) => {
  const { location: { pathname } } = useRouterState();
  const color = useMemo(() => Math.floor(Math.random()*16777215).toString(16), [username]);

  const [scale, setScale] = useState(0.5);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const toggleScale = () => setScale(scale === 0.5 ? 1 : 0.5);
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setShowContextMenu(true);
  }

  if (pathname !== route) return null;

  const styles = {
    circle: {
      width: 80,
      height: 80,
      transition: 'all 0.3s ease-in-out',
      left: x + window.innerWidth / 2, 
      top: y, 
      position: 'fixed',
      borderRadius: '50%',
      border: '2px solid #fff',
      pointerEvents: 'all'
    },
    pointer: {
      color,
      position: 'absolute',
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) scale(${scale})`,
      transition: 'all 0.3s ease-in-out',
    }
  } satisfies Record<string, CSSProperties>;

  const contextMenuItems = [
    { label: 'test', onClick: () => {} }
  ];

  return (
    <div 
      style={styles.circle}
      onMouseEnter={toggleScale}
      onMouseLeave={toggleScale}
      onContextMenu={handleContextMenu}
    >
      <FontAwesomeIcon 
        icon={faArrowPointer} 
        style={styles.pointer}
        size={"2x"}
      />
      {showContextMenu && (
        <ContextMenu 
          items={contextMenuItems} 
          arcRadius={40} 
          position="right" 
        />
      )}
    </div>
  )
}

type TVisitorMice = React.FC<{
  children: React.ReactNode
}>

export const VisitorMice: TVisitorMice = ({ 
  children 
}) => {
  const username = useMemo(() => Math.random().toString(36).substring(7), []);
  const { data, isSuccess } = sockets.useMousePosition(username);

  return (
    <>
      <div className="visitorMice">
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