import { useContext, useEffect, useState } from 'react';
import { EventsContext } from '../../App';

function EventListings() {
	let { user_id } = useContext(EventsContext);
	let [events, setEvents] = useState();
	
	useEffect(() => {
		fetch('http://127.0.0.1:5555/events')
		.then(response => response.json())
		.then(data => {
			setEvents(data);
		})
	})

	let organizerEventsCards;

	// if (events[0] !== undefined){
	// 	organizerEventsCards = events.map( (event) => {
			
	// 	})
	// }

	return (
		<div>
			
		</div>
	)
}

export default EventListings;