import React, { useState } from 'react';
import './toggle.scss'

export const FlipToggle = ({ onChange }) => {
  const [stateBoolean, setStateBoolean] = useState(false);

  const toggleState = () => {
    onChange();
    setStateBoolean(!stateBoolean);
  }

  return (
    <div id="toggle_container">
      <input 
        type="checkbox"
        checked={stateBoolean}
        onChange={toggleState}
        id="cb1" 
        className="tgl tgl-flip"
      />
      <label className="tgl-btn" data-tg-off="Published" data-tg-on="Drafts" htmlFor="cb1"></label>
    </div>
  )
};

export default FlipToggle;