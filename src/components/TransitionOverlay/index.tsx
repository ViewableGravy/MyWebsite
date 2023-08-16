import React, { useEffect } from "react";
import { useGlobalState } from "../../functionality/state/[LEGACY]state";
import { useNavigate } from "react-router-dom";
import createTimeline from "../../helpers/functions/createTimeline";

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
      {children}
      <div className={`overlay ${transition ? 'active' : ''}`} style={{ display: hidden ? 'none' : '' }} />
    </>
  )
};

export default Overlay;