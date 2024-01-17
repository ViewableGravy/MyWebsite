import React, { useEffect, useMemo } from "react";
import { useGlobalState } from "../../functionality/state/[LEGACY]state";
import { useLocation, useNavigate } from "react-router-dom";
import createTimeline from "../../helpers/functions/createTimeline";
import Sockets from "hooks/sockets";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const usePreviousValue = <T, >(value: T) => {
  const ref = React.useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const VisitorMouse = ({ x, y, username, route }: {
    x: number,
    y: number,
    username: string,
    route: string,
}) => {
  const { pathname } = useLocation();
  const color = useMemo(() => Math.floor(Math.random()*16777215).toString(16), [username]);
  const previousPosition = usePreviousValue({ x, y });
  

  /**
   * vector indicating direction and momentum of x,y
   */
  const getVector = () => {
    const vector = {
      x: x - previousPosition.x,
      y: y - previousPosition.y
    };

    return vector;
  }

  // 

  if (pathname !== route) return null;

  return (
      <FontAwesomeIcon icon={faArrowPointer} style={{ position: "fixed", left: x, top: y, color, transition: 'all 0.3s ease-in-out' }} />
  )
}



const VisitorMice = ({ 
  children 
}: {
  children: React.ReactNode
}) => {
  const username = useMemo(() => Math.random().toString(36).substring(7), []);
  const { data, isError, isSuccess } = Sockets.useMousePosition(username);

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

const Overlay = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useGlobalState();
  const [transition, setTransition] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const navigate = useNavigate();

  const startTimeline = createTimeline([
    {
      event: () => {
        setTransition(true);
        dispatch({ transition: {state: "transitioning"}});
      },
      delay: 100
    },
    {
      event: () => {
        navigate(state?.transition?.location);
      },
      delay: 400
    },
    {
      event: () => {
        setTransition(false);
      },
      delay: 100
    },
    {
      event: () => {
        setHidden(true);
        dispatch({ transition: {state: "end"}});
      },
      delay: 400
    }
  ]);

  const transitionState = state?.transition?.state;

  useEffect(() => {
    if (transitionState !== "start") return;

    setHidden(false);
  }, [transitionState]);

  useEffect(() => {
    if (hidden) return;

    startTimeline();
  }, [hidden]);

  return (
    <>
      <VisitorMice>
        {children}
      </VisitorMice>
      <div className={`overlay ${transition ? 'active' : ''}`} style={{ display: hidden ? 'none' : '' }} />
    </>
  )
};

export default Overlay;