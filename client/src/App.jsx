import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import AuthPage from "./components/authpage";
import "./App.css";
<<<<<<< HEAD
=======
import AdminDashboard from "./components/minad.jsx";
>>>>>>> 9bf1dee (fix: UI fixed looking good)
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
<<<<<<< HEAD
  return (
    <EventsContext.Provider value={jwtDecode}>
      <Router>
=======
  let [signedIn, setSignedIn] = useState();
  let token = localStorage.getItem("user_auth_token");
  let token_exists = token !== null;
  let user_id;
  token_exists ? (user_id = jwtDecode(token).sub) : null;

  function handleLogOutTokenBlock() {
    localStorage.removeItem("user_auth_token");
    setSignedIn(false);
    jwtDecode(token).exp = 0;

    fetch("http://127.0.0.1:5555/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <Router>
      <EventsContext.Provider
        value={{
          token,
          token_exists,
          user_id,
          handleLogOutTokenBlock,
          signedIn,
          setSignedIn,
        }}
      >
>>>>>>> 9bf1dee (fix: UI fixed looking good)
        <div id="home">
          <Navbar />

          <hr />
          <div></div>
          <Routes>
            <Route path="/authpage/*" element={<AuthPage />} />
<<<<<<< HEAD
            <Route path="/home/*" element={<Home />} />
=======
            <Route path="/" element={<Home />} />
>>>>>>> 9bf1dee (fix: UI fixed looking good)
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
<<<<<<< HEAD
      </Router>
    </EventsContext.Provider>
=======
      </EventsContext.Provider>
    </Router>
>>>>>>> 9bf1dee (fix: UI fixed looking good)
  );
}

export default App;
