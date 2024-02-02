/***** BASE IMPORTS *****/
import { useState } from 'react';
import classNames from 'classnames';

/***** HOOKS *****/
import { useIsMouseDown } from 'hooks/isMouseDown';

/***** CONSTS *****/
import './toggle.scss'

export const FlipToggle = ({ onChange, initialState, titleEnabled, titleDisabled }) => {
  /***** STATE *****/
  const [isChecked, setIsChecked] = useState(!initialState);
  const [isMouseDown, mouseDownEventHandlers] = useIsMouseDown();

  /***** RENDER HELPERS *****/
  const toggleState = () => {
    onChange();
    setIsChecked((isChecked) => !isChecked);
  }

  const classes = {
    input: 'FlipToggle__input',
    label: classNames('FlipToggle__label', {
      'FlipToggle__label--checked': isChecked,
      'FlipToggle__label--mousedown': isMouseDown,
    })
  }

  /***** RENDER *****/
  return (
    <div className="FlipToggle">
      <label 
        {...mouseDownEventHandlers}
        className={classes.label} 
        data-tg-off={titleDisabled} 
        data-tg-on={titleEnabled} 
      >
        <input 
          type="checkbox"
          checked={isChecked}
          onChange={toggleState}
          className={classes.input}
        />
      </label>
    </div>
  )
};
