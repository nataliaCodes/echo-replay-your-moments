import React, { useState } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

export default function SwitchButton(props) {
  const { setVideoInfo } = props;
  const [toggle, setToggle] = useState(true);
  const [ckecked, setChecked] = useState(true)

  const handleOnChange = () => {
    if(toggle){
      setToggle(false);
      setChecked(true);
      setVideoInfo((prev)=>({...prev, loop: 1}));
      console.log("ON")
    }
    if(!toggle){
      setToggle(true);
      setChecked(false);
      setVideoInfo((prev)=>({...prev, loop: 0}));
      console.log("OFF")
    }
  };

  return (

    <BootstrapSwitchButton
      // checked={ckecked}
      onlabel='AUTO'
      offlabel='OFF'
      onChange={() => handleOnChange()}
      onstyle="success"
    />

  );
}