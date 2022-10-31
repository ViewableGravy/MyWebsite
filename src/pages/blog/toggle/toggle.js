import React, { useState } from 'react';
import './toggle.scss'

export const FlipToggle = () => {
  const [state, setState] = useState(true);

  return (
    <div id="toggle_container">
      <input 
        type="checkbox"
        checked={state}
        onChange={() => setState(!state)}
        id="cb1" 
        className="tgl tgl-flip"
      />
      <label className="tgl-btn" data-tg-off="Published" data-tg-on="Drafts" htmlFor="cb1"></label>
    </div>
  )
}

export default FlipToggle;