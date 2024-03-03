import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import Home from "./components/home";
import Event from "./components/event";
import EventDetails from "./components/eventdetails";
import AdminDashboard from "./components/minad.jsx";
import Dashboard from "./components/AdminDash.jsx";
import Navbar from "./components/navbar.jsx";
import Booking from "./components/booking.jsx";
import TicketHistory from "./components/TicketHistory";
import EventHistory from "./components/EventHistory";
import NewEvent from "./components/new_Event";
import BillingInfo from "./components/billing_info";
import AdvertFeeInvoices from "./components/AdvertFeeInvoices";
import TicketCount from "./components/TicketCount";
import BillingDetails from "./components/billing_details";
import Booked from "./components/booked";
import Reviews from "./components/Reviews.jsx";
import AdminDashBrd from "./components/AdminDash";
import OrganizerDashBoard from "./components/OrganizerDash/OrganizerDashBoard.jsx";
import PassReset from "./components/PasswordReset/PassReset.jsx";
import User from "./components/DashBoards/userDashboard";
import "./App.css";
import { jwtDecode } from "jwt-decode";
export const EventsContext = createContext();


function App() {
	let [signedIn, setSignedIn] = useState(false);
	let token = localStorage.getItem("user_auth_token");
	let token_exists = token !== null;
	let user_id = null;
	let role = null;

	if (token_exists){
		user_id = jwtDecode(token).sub;
		role = jwtDecode(token).role;
	}
	

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
			role,
			}}
		>
			<div id="home">
			<Navbar />
			<Routes>
				<Route path="/" element={<Event></Event>}></Route>
				<Route path='/signup' element={<SignUp></SignUp>}></Route>
				<Route path='/signin' element={<SignIn></SignIn>}></Route>
				<Route path="/event/*" element={<Event />} />
				<Route path="/home/*" element={<Home />} />
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
				<Route path="/organizer_dashboard/*" element={<OrganizerDashBoard></OrganizerDashBoard>} exact></Route>
				<Route path="/user_dashboard" element={<User />} />
			</Routes>
			</div>
		</EventsContext.Provider>
		</Router>
	);
}

export default App;