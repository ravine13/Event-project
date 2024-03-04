import { useContext, useEffect, useState } from 'react';
import { EventsContext } from '../../App';

function EventListings() {
	let { user_id } = useContext(EventsContext);
	let [events, setEvents] = useState();
	
	useEffect(() => {
		fetch('https://event-project.onrender.com/events')
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