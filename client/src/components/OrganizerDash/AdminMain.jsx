import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NewOrganizerEvent from './NewEvent';
import { EventsContext } from '../../App';

function AdminMain() {
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
		<div className='dash_main'>
			<Routes>
				<Route path={`/ads`}></Route>
				<Route path={`/invoices`}></Route>
				<Route path={`/billing_details`}></Route>
				<Route path={`/billing_info`}></Route>
				<Route path={`/events`}></Route>
				<Route path={`/add_events`} element={<NewOrganizerEvent></NewOrganizerEvent>} exact></Route>
				<Route path={`/event_history`}></Route>
				<Route path={`/tickets`}></Route>
				<Route path={`/ticket_count`}></Route>
				<Route path={`/tickets_booked`}></Route>
			</Routes>
		</div>
	)
};

export default AdminMain;