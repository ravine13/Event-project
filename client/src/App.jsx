import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./components/authpage";
import "./App.css";
import './SignUp.css';
import AdminDashboard from './components/DashBoards/Admin';
import Home from "./components/home";
import Event from "./components/event";
import EventDetails from "./components/eventdetails";
// import Booking from "./components/eventdetails";
import Dashboard from './components/dashboard';
import Navbar from  './components/navabar';
import TicketHistory from "./components/TicketHistory";
import EventHistory from "./components/EventHistory";
import NewEvent from "./components/new_Event";
import BillingInfo from "./components/billing_info";
import AdvertFeeInvoices from "./components/AdvertFeeInvoices";
import TicketCount from "./components/TicketCount";
import BillingDetails from "./components/billing_details";
import SignUp from "./components/SignUp";
import { jwtDecode } from "jwt-decode";
export const EventsContext = createContext();
import Booking from "./components/booking.jsx";

function App() {
  let [signedIn, setSignedIn] = useState();
  let token = localStorage.getItem('user_auth_token');
  let token_exists = token !== null;
  let user_id;
  token_exists ? user_id = jwtDecode(token).sub : null;

  function handleLogOutTokenBlock(){
    localStorage.removeItem('user_auth_token');
    setSignedIn(false);
    jwtDecode(token).exp = 0;

    fetch('http://127.0.0.1:5555/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.json())
    .then(data => {
      console.log(data);
    })
  }


  return (
    <Router>
      <EventsContext.Provider value={{token, token_exists, user_id, handleLogOutTokenBlock, signedIn, setSignedIn}}>
      <div id="home">
        <Navbar />

        <hr />
        <div></div>
        <Routes>
          <Route path="/authpage/*" element={<AuthPage />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/event/*" element={<Event />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path = "/Admin/*" element={<AdminDashboard />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/booking/:eventId" element={<Booking />} />
          <Route path="/TicketHistory" element={<TicketHistory />} />
          <Route path="/EventHistory" element={<EventHistory />} />
          <Route path="/new_Event" element={<NewEvent />} />
          <Route path="/billing_info" element={<BillingInfo />} />
          <Route path="/billing_details" element={<BillingDetails />} />
          <Route path="/AdvertFeeInvoices" element={<AdvertFeeInvoices />} />
          <Route path="/ticket-count" element={<TicketCount />} />
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
        </Routes>
      </div>
      </EventsContext.Provider>
    </Router>

  );
}

export default App;
