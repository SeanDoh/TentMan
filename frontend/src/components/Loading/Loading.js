import React from 'react';
import { SpinnerGap } from 'phosphor-react'

export default function Loading (props){
  let size = props.size ? props.size : 42;
  return(
    <div className='flex p-3 w-full justify-center items-center'>
      <SpinnerGap className='animate-spin' size={size}/>
    </div>
  )
}