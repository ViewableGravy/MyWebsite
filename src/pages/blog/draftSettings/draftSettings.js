import {useState, useEffect, useRef} from 'react';
import './draftSettings.scss';

export const DraftSettings = ({ onSave, onCancel, onColorChange, hidden }) => {

  const [isHidden, setIsHidden] = useState(hidden ? true : false);

  useEffect(() => {
    setIsHidden((isHidden) => isHidden ? true : false);
  }, [isHidden]);


  return (
    <div className={`draft-setting-container ${hidden ? 'hidden' : ''}`} contentEditable={false}>
      <i className={'circle-button tick fa fa-check'}></i>
      <i className={'circle-button cross fa-solid fa-x'}></i>
      <input type="color" value="#00ffee" className={'circle-button color-palete'}></input>
    </div>
  )
}

export default DraftSettings;
