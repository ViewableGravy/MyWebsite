import React, { useState } from 'react';
import './toggle.scss'

export const FlipToggle = ({ onChange, initialState, titleEnabled, titleDisabled }) => {
  const [state, setStateBoolean] = useState(initialState);

  const toggleState = () => {
    onChange();
    setStateBoolean(!state);
  }

  return (
    <div id="toggle_container">
      <input 
        type="checkbox"
        checked={state}
        onChange={toggleState}
        id="cb1" 
        className="tgl tgl-flip"
      />
      <label className="tgl-btn" data-tg-off={titleEnabled} data-tg-on={titleDisabled} htmlFor="cb1"></label>
    </div>
  )
};

export default FlipToggle;