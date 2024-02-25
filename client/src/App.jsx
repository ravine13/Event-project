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
import BillingInfo from "./components/billing_info";
import AdvertFeeInvoices from "./components/AdvertFeeInvoices";
import TicketCount from "./components/TicketCount";


function App() {
  return (
    <Router>
      <div id="home">
        <Navbar />
        <hr />
        <div></div>
        <Routes>
          <Route path="/authpage/*" element={<AuthPage />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/event/*" element={<Event />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/booking/:eventId" element={<Booking />} />
          <Route path="/TicketHistory" element={<TicketHistory />} />
          <Route path="/EventHistory" element={<EventHistory />} />
          <Route path="/new_Event" element={<NewEvent />} />
          <Route path="/billing_info" element={<BillingInfo />} />
          <Route path="/AdvertFeeInvoices" element={<AdvertFeeInvoices />} />
          <Route path="/ticket-count" element={<TicketCount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
