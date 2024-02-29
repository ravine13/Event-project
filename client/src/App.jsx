import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import AuthPage from "./components/authpage";
import "./App.css";
import AdminDashboard from "./components/minad.jsx";
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
import Booking from "./components/booking";
import Booked from "./components/booked";
import Reviews from "./components/Reviews.jsx";

import AdminDashBrd from "./components/AdminDash";
// import EventGoerDash from "./components/EventGoerDash/EventGoerDash.jsx";
import OrganizerDashBoard from "./components/OrganizerDash/OrganizerDashBoard.jsx";
import PassReset from "./components/PasswordReset/PassReset.jsx";

function App() {


  let [signedIn, setSignedIn] = useState(false);
  let token = localStorage.getItem("user_auth_token");
  let token_exists = token !== null;
  let user_id;
  let role;
  if (token_exists) {
    user_id = jwtDecode(token).sub;
  }
  token_exists ? (role = jwtDecode(token).role) : null;

  function handleLogOutTokenBlock() {
    localStorage.removeItem("user_auth_token");
    setSignedIn(false);
    jwtDecode(token).exp = 0;

    fetch("http://127.0.0.1:5555/logout", {
      headers: {
        Authorization: `Bearer, ${token}`,
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
          role,
        }}
      >
        <div id="home">
          <Navbar />
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
            <Route path='/password_reset/*' element={<PassReset></PassReset>}></Route>
            <Route path="/booked" element={<Reviews />} />
            
            <Route path="/admin_dashboard/*" element={<AdminDashBrd></AdminDashBrd>} exact></Route>
            {/* <Route path="/event_goer_dashboard/*" element={<EventGoerDash></EventGoerDash>} exact></Route> */}
            <Route path="/organizer_dashboard/*" element={<OrganizerDashBoard></OrganizerDashBoard>} exact></Route>
          </Routes>
        </div>
      </EventsContext.Provider>
    </Router>
  );
}

export default App;
