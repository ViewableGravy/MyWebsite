import React, { useEffect } from "react";
import { useGlobalState } from "../../functionality/state/[LEGACY]state";
import { timelineEvent, createTimeline } from "../../utilities/functions/createTimeline";
import { useNavigate } from "@tanstack/react-router";
import { VisitorMice } from "components/liveMouse";



/**
 * Website overlay that displays during transitions between pages.
 * 
 * As of introducing tanstack router, due to typing limitations, this is currently unused.
 */
const Overlay = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useGlobalState();
  const [transition, setTransition] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const navigate = useNavigate();

  const startTimeline = createTimeline([
    timelineEvent(() => {
      setTransition(true);
      dispatch({ transition: {state: "transitioning"}});
    }, 100),
    timelineEvent(() => {
      navigate(state?.transition?.location);
    }, 400),
    timelineEvent(() => {
      setTransition(false);
    }, 100),
    timelineEvent(() => {
      setHidden(true);
      dispatch({ transition: {state: "end"}});
    }, 400)
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