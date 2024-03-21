import { useContext } from 'react';
import '../DashBoards/Dashboard.css';
import { NavLink } from 'react-router-dom';
import { EventsContext } from '../../App';

function AdminNav() {
	let { token_exists, role } = useContext(EventsContext);

	let dash_url;
  	if (role === 100){
    	dash_url = '/user_dashboard'
  	}
	else if (role === 101){
		dash_url = '/organizer_dashboard'
	}
	else if (role === 111){
		dash_url = '/admin_dashboard'
	}

	return (
		<div className='admin_sidebar rounded w-60 p-1'>
			<div className='p-2'>User X</div>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/ads`}>Advertisements</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/invoices`}>Invoices</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/billing_details`}>Billing Details</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/billing_info`}>Billing Info</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/events` }>My Event Listings</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/add_events`}>Add Events</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/event_history`}>Event History</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/tickets`}>Tickets</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/ticket_count`}>Tickets Count</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={`${dash_url}/tickets_booked`}>Tickets Booked</NavLink>
		</div>
	)
};

export default AdminNav;