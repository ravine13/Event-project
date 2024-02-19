import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { useState } from 'react';
import './App.css';

function App() {


  return (
    <Router>
      <div id="home">
        <div></div>
        <div id='nav'>
          <div>
            <img src='' alt='logo' />
          </div>
          <div>
            <span className="logo">Ticket Today Projet</span>
          </div>
          <div className='nav-list'>
            <div >
              <Link id='log-list' to="/authpage/signup">Login</Link>
            </div>
            <div>
              <Link id='log-list' to="/">Explore</Link>
            </div>
          </div>
        </div>
        <hr />
        <div></div>

        <Routes>
          <Route />
        </Routes>
      </div>
    </Router>
  );
}

export default App;