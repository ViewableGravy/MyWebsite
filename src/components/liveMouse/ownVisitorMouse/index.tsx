import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextMenu } from "../contextMenu";
import { useDelayedCallback } from "./useDelay";
import { useAtom } from "jotai/react";
import { store } from "store";

const generateStyles = ({ x, y, color, scale }: {
  x: number,
  y: number,
  color: string,
  scale: number
}) => ({
  circle: {
    width: 80,
    height: 80,
    transition: 'all 0.3s ease-in-out',
    left: x + window.innerWidth / 2, 
    top: y, 
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  pointer: {
    color,
    position: 'absolute',
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) scale(${scale})`,
    transition: 'all 0.3s ease-in-out',
  }
}) satisfies Record<string, CSSProperties>;

export const OwnVisitorMouse = ({ x, y, username, route }: {
    x: number,
    y: number,
    username: string,
    route: string,
  }) => {
    /***** STATE *****/
    const color = useMemo(() => Math.floor(Math.random()*16777215).toString(16), [username]);
    const ref = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState(0.5);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [, setFollowing] = useAtom(store.visitorMice.following.followerState)

    /***** HOOKS *****/
    const { location: { pathname } } = useRouterState();
    const previousOverlapRef = useRef<boolean>(false);
    const { initiate, clear } = useDelayedCallback(() => {
      setShowContextMenu(false);
    }, 1000)

    /***** EFFECTS *****/
    useEffect(() => {
      const handleContextMenu = (event: MouseEvent) => {
        if (!ref.current) return;

        // get position of mouse on screen
        const x = event.clientX - 40;
        const y = event.clientY - 40;

        // check if my mouse is in 40 px radios
        const distance = Math.sqrt(Math.pow(x - ref.current.offsetLeft, 2) + Math.pow(y - ref.current.offsetTop, 2));
        if (distance > 40) return;

        // show context menu
        event.preventDefault();
        setShowContextMenu(true);
      }

      const handleHover = (event: MouseEvent) => {
        if (!ref.current) return;

        // get position of mouse on screen
        const x = event.clientX - 40;
        const y = event.clientY - 40;

        // check if my mouse is in 40 px radios
        const distance = Math.sqrt(Math.pow(x - ref.current.offsetLeft, 2) + Math.pow(y - ref.current.offsetTop, 2));
        if (distance > 40 && previousOverlapRef.current) {
          previousOverlapRef.current = false;
          if (!showContextMenu)
            initiate();
          return setScale(0.5);
        } 
        
        if (distance < 40 && !previousOverlapRef.current) {
          previousOverlapRef.current = true;
          clear();
          return setScale(1);
        }
      }

      window.addEventListener('contextmenu', handleContextMenu);
      window.addEventListener('mousemove', handleHover);

      return () => {
        window.removeEventListener('contextmenu', handleContextMenu);
        window.removeEventListener('mousemove', handleHover);
      }
    }, [initiate, clear, showContextMenu])

    /**** RENDER HELPERS *****/
    const styles = generateStyles({ x, y, color, scale })
    const contextMenuItems = {
      third: () => { setFollowing(username) }
    }

    /***** RENDER *****/
    if (pathname !== route) return null;
  
    return (
      <div 
        ref={ref}
        style={styles.circle}
      >
        <FontAwesomeIcon 
          icon={faArrowPointer} 
          style={styles.pointer}
          size={"2x"}
        />
        <ContextMenu 
          isOpen={showContextMenu}
          items={contextMenuItems} 
          delay={{ initiate, clear }}
        />
      </div>
    )
  }