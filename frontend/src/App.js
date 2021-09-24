import GrowTentPage from './pages/GrowTentPage/GrowTentPage';
import CamerasPage from './pages/CamerasPage/CamerasPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import FeedingPage from './pages/FeedingPage/FeedingPage';
import HomePage from './pages/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <Router>
      <div id='app' className='sm:mx-10'>
        <NavBar/>
        <Switch>
          <Route path='/home'>
            <HomePage/>
          </Route>
          <Route path='/pages/growtent'>
            <GrowTentPage/>
          </Route>
          <Route path='/pages/feeding'>
            <FeedingPage/>
          </Route>
          <Route path='/pages/cameras'>
            <CamerasPage/>
          </Route>
          <Route path='/pages/calendar'>
            <CalendarPage demo={process.env.REACT_APP_IS_DEMO}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}