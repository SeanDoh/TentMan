import React from 'react';
import { Link } from 'react-router-dom';
import { List, House, Leaf,  VideoCamera, Calendar, ForkKnife } from 'phosphor-react';

export default function NavBar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className='flex flex-col sm:flex-row justify-between bg-gray-800 font-bold'>
        <div className='flex flex-row justify-between p-3 hover:opacity-75'>
          <Link to='/home'>
            <House weight='bold' size={30}/>
          </Link>
          <button
            className="text-white cursor-pointer text-xl sm:hidden"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <List color="#ffffff"/>
          </button>
        </div>
        <div
          className={
            "sm:flex flex items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger">
          <ul style={{"width" :"100%"}} className='flex flex-col sm:flex-row justify-center w-full'>
            <li className='p-3 hover:opacity-75 flex flex-row justify-center'>
              <Link to='/pages/growtent' className='flex flex-row items-center justify-center w-full'>
                <Leaf className='mr-2'/>
                <p>Grow Tents</p>
              </Link>
            </li>
            <li className='p-3 hover:opacity-75 flex flex-row justify-center'>
              <Link to='/pages/feeding' className='flex flex-row items-center justify-center w-full'>
                <ForkKnife className='mr-2'/>
                <p>Feeding</p>
              </Link>
            </li>
            <li className='p-3 hover:opacity-75 flex flex-row justify-center'>
              <Link to='/pages/cameras' className='flex flex-row items-center justify-center w-full'>
                <VideoCamera className='mr-2'/>
                <p>Cameras</p>
              </Link>
            </li>
            <li className='p-3 hover:opacity-75 flex flex-row justify-center'>
              <Link to='/pages/calendar' className='flex flex-row items-center justify-center w-full'>
                <Calendar className='mr-2'/>
                <p>Calendar</p>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}