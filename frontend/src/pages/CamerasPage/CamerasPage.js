import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import Camera from '../../components/Camera/Camera';

export default function CamerasPage() {
  const [cameras, getCameras] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);

  useEffect(() => {
    async function callAPI() {
      try {
        const response = await fetch('/camera');
        let data = await response.json();
        getCameras(data.data);
        setApiStatus(true);
        return data;
      } catch (error) {
        setApiStatus(false);
        return error
      }
    }
    callAPI();
  }, [])

  return (
    <div id='CamerasPage' className='mt-1'>
      <div className='flex flex-row items-center justify-between'>
        <h1 className='font-bold text-xl'>Cameras</h1>
        <button className='font-bold text-lg p-2 rounded-lg bg-blue-500 hover:bg-blue-600'>New Camera</button>
      </div>
      <div className='flex flex-row flex-wrap'>
        {apiStatus ? <Cameras cameras={cameras}/> : <Loading />}
      </div>
    </div>
  );
}


function Cameras(props){
  return (
    <>
      {props.cameras.map(item => {
        return (
          <div key={item.name} className='flex flex-col p-1'>
            <div className='flex flex-row justify-between items-center p-2'>
              <h2 className='font-bold text-lg pb-1'>{item.name}</h2>
              <button className='bg-red-500 rounded-lg p-1 font-bold hover:bg-red-600'>Delete</button>
            </div>
            <Camera name={item.name} source={item.url} width={'640'} height={'480'}/>
          </div>
        )
      })}
    </>
  )
}