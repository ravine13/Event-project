import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { useState } from 'react';
import AuthPage from './components/authpage';
import './App.css';
import Home from './components/home';

function App() {


  return (
    <Router>
      <div id="home">
        <div></div>
        <div id='nav'>
          
          <div id='logo-stf'>
            <div id='under-ln'><span id='top-ln'>Ev </span> &<span id='top-ln'> P</span></div>
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
              <Link id='log-list' to="/events">Events</Link>
            </div>
            <div >
              <Link id='log-list' to="/authpage/signup">Login</Link>
            </div>
            <div>
              <Link  to="/"><button id='tck-btn' type='button'>Buy Ticket</button></Link>
            </div>
            
            
          </div>
        </div>
        <hr />
        <div></div>

        <Routes>
          <Route path="/authpage/*" element={<AuthPage />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;