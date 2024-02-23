<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import AuthPage from './components/authpage';
import './App.css';
import Home from './components/home';
import Event from './components/event';
import SignupForm from './components/signupform';
import EventDetails from './components/eventdetails';
import AdminDashboard from './components/DashBoards/Admin';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/authpage";
import "./App.css";
import Home from "./components/home";
import Event from "./components/event";
import EventDetails from "./components/eventdetails";
import Booking from "./components/eventdetails";
import Dashboard from './components/dashboard';
import Navbar from  './components/navabar';
import TicketHistory from "./components/TicketHistory";
import EventHistory from "./components/EventHistory";
import NewEvent from "./components/new_Event";
import BillingInfo from "./components/BillingInfo";
import AdvertFeeInvoices from "./components/AdvertFeeInvoices";
import TicketCount from "./components/TicketCount";

>>>>>>> 01507b4f0ca97816d9289c61e7f6a5040e26ef53

function App() {
  return (
    <Router>
      <div id="home">
<<<<<<< HEAD
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
=======
        <Navbar />
>>>>>>> 01507b4f0ca97816d9289c61e7f6a5040e26ef53
        <hr />
        <div></div>
        <Routes>
          <Route path="/authpage/*" element={<AuthPage />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/event/*" element={<Event />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
<<<<<<< HEAD
          <Route path = "/Admin/*" element={<AdminDashboard />} />
=======
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/booking/:eventId" element={<Booking />} />
          <Route path="/ticket-history" element={<TicketHistory />} />
          <Route path="/event-history" element={<EventHistory />} />
          <Route path="/new_Event" element={<NewEvent />} />
          <Route path="/billing-info" element={<BillingInfo />} />
          <Route path="/advert-fee-invoices" element={<AdvertFeeInvoices />} />
          <Route path="/ticket-count" element={<TicketCount />} />
>>>>>>> 01507b4f0ca97816d9289c61e7f6a5040e26ef53
        </Routes>
      </div>
    </Router>
  );
}

export default App;
