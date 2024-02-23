import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import AuthPage from './components/authpage';
import './App.css';
import Home from './components/home';
import Event from './components/event';
import SignupForm from './components/signupform';
import EventDetails from './components/eventdetails';
import AdminDashboard from './components/DashBoards/Admin';

function App() {
  
  const [showBackButton, setShowBackButton] = useState(false); 

  useEffect(() => {
  
    setShowBackButton(window.location.pathname !== '/');
  }, []);

  const goBack = () => {
    window.history.back();
  };


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
            
            <div>
              <Link to ="Admin">Admin</Link>
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
        {showBackButton && <button id="back-button" onClick={goBack}>Back</button>}
        <Routes>
        
          <Route path="/authpage/*" element={<AuthPage />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/event/*" element={<Event />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path = "/Admin/*" element={<AdminDashboard />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;