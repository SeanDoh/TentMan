import React, { useState } from 'react';
import {ArrowsClockwise } from 'phosphor-react';

export default function Camera(props) {
  let [degrees, setDegrees] = useState(0);
  const id = `camera-${props.name}`
  const className = `transform rotate-${degrees}`
  return (
    <div id={id} className='flex m-2 relative'>
      <ArrowsClockwise onClick={() => setDegrees(degrees === 0 ? degrees = 180 : degrees = 0)} className='absolute top-0 right-0 z-10 m-1'/>
      <img className={className} src={props.source} alt='camera'/>
    </div>
  );
}