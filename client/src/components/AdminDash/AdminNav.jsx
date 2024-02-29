import React from 'react';
import '../DashBoards/Dashboard.css';
import { NavLink } from 'react-router-dom';

function AdminNav() {
	return (
		<div className='admin_sidebar rounded w-60 p-1'>
			<div className='p-2'>User X</div>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/ads'}>Advertisements</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/invoices'}>Invoices</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/billing_details'}>Billing Details</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/billing_info'}>Billing Info</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/events'}>Events</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/add_events'}>Add Events</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/event_history'}>Event History</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/tickets'}>Tickets</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/ticket_count'}>Tickets Count</NavLink>
			<NavLink className='rounded p-2 m-2 d-block text-white' to={'/admin_dashboard/tickets_booked'}>Tickets Booked</NavLink>
		</div>
	)
};

export default AdminNav;