import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { useState } from 'react';
import AuthPage from './components/authpage';
import './App.css';
import Home from './components/home';
import Event from './components/event';
import EventDetails from './components/eventdetails';

function App() {


  return (
    <Router>
      <div id="home">
        <div></div>
        <div id='nav'>
          
          <div id='logo-stf'>
            <div id='under-ln'><span id='top-ln'>T</span> &<span id='top-ln'> N</span></div>
            <div id='under-ln'><span>_______   __</span></div>
              
          </div>
          
          <div></div>
          
          <div className='nav-list'>
            
            <div>
              <input id='srch-bar' placeholder='Search Event'></input>
            </div>
            <div>
              <Link id='log-list' to="/home">Home</Link>
            </div>
            <div>
              <Link id='log-list' to="/event">Events</Link>
            </div>
            <div >
              <Link id='log-list' to="/authpage/signup">Login</Link>
            </div>
            <div>
              <Link  to="/event"><button id='tck-btn' type='button'>Buy Ticket</button></Link>
            </div>
            
            
          </div>
        </div>
        <hr />
        <div></div>

        <Routes>
          <Route path="/authpage/*" element={<AuthPage />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/event/*" element={<Event />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;