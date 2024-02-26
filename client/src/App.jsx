import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import AuthPage from "./components/authpage";
import "./App.css";
import Home from "./components/home";
import Event from "./components/event";
import EventDetails from "./components/eventdetails";
import Dashboard from "./components/AdminDash.jsx";
import Navbar from "./components/navbar.jsx";
import TicketHistory from "./components/TicketHistory";
import EventHistory from "./components/EventHistory";
import NewEvent from "./components/new_Event";
import BillingInfo from "./components/billing_info";
import AdvertFeeInvoices from "./components/AdvertFeeInvoices";
import TicketCount from "./components/TicketCount";
import BillingDetails from "./components/billing_details";
import { jwtDecode } from "jwt-decode";
export const EventsContext = createContext();
import Booking from "./components/booking.jsx";
import Booked from "./components/booked.jsx";
import AdminDashboard from "./components/minad.jsx";

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
          <Route path="/event/:eventId/*" element={<EventDetails />} />
          <Route path="/minad/*" element={<AdminDashboard />} />
          <Route path="/AdminDash/" element={<Dashboard />} />
          <Route path="/booking/:eventId" element={<Booking />} />
          <Route path="/booking/*" element={<Booking />} />
          <Route path="/TicketHistory" element={<TicketHistory />} />
          <Route path="/EventHistory" element={<EventHistory />} />
          <Route path="/new_Event" element={<NewEvent />} />
          <Route path="/billing_info" element={<BillingInfo />} />
          <Route path="/billing_details" element={<BillingDetails />} />
          <Route path="/AdvertFeeInvoices" element={<AdvertFeeInvoices />} />
          <Route path="/TicketCount" element={<TicketCount />} />
          <Route path="/booked" element={<Booked />} />
        </Routes>
      </div>
      {/* </EventsContext.Provider> */}
    </Router>
  );
}

export default App;
