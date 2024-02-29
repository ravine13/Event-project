import { useState, useContext } from 'react';
import { EventsContext } from '../../App';

function NewOrganizerEvent() {
	let { user_id, token } = useContext(EventsContext);
	let [inputs, setInputs] = useState({});

	function onInputChange(e){
		let name = e.target.name;
		let value = e.target.value;

		setInputs(current => ({...current, [name]: value}));
	}

	function onEventSubmit(e){
		e.preventDefault();

		fetch('http://127.0.0.1:5555/photos', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'url': inputs['photo_url']})
		})
		.then(response => {
			if (response.ok) {
				return(
					response.json()
				)
			}
		})
		.then((photo) => {
			if (photo) {
				fetch('http://127.0.0.1:5555/new_event', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({...inputs, "organiser_id": user_id, 'photo_id': photo.id})
				})
				.then(response => response.json())
				.then(data => {
					console.log(data);
				})
			}
		})
	}

	return (
		<div>
			<form onSubmit={onEventSubmit}>
				<div className='form-group'>
				<p>Name</p>
				<input className='bg-primary color-white p-1 m-1' onChange={onInputChange} type="text" name='name' required/> <br />
				<p>Photo_URL</p>
				<input className='bg-primary color-white p-1 m-1' onChange={onInputChange} type="text" name='photo_url' />
				<p>Desc</p>
				<input className='bg-primary color-white p-1 m-1' onChange={onInputChange} type="text" name='description' /> <br />
				<p>Start Date</p>
				<input className='bg-primary color-white p-1 m-1' onChange={onInputChange} type="date" name='start_date'/> <br />
				<p>End Date</p>
				<input className='bg-primary color-white p-1 m-1' onChange={onInputChange} type="date" name='end_date'/> <br />
				<p>Start Time</p>
				<input className='bg-primary color-white p-1 m-1' onChange={onInputChange} type="time" name='start_time'/> <br />
				<p>End Time</p>
				<input className='bg-primary color-white p-1 m-1' onChange={onInputChange} type="time" name='end_time'/> <br />
				<p>Duration</p>
				<input className='bg-primary color-white p-1 m-1' onChange={onInputChange} type="text" name='duration'/> <br />
				<p>Venue</p>
				<input className='bg-primary color-white p-1 m-1' onChange={onInputChange} type="text" name='venue'/> <br />
				</div>
				<input className='bg-primary color-white p-1 m-1' type="submit" value={'Post Event'}/>
			</form>
		</div>
	)
}

export default NewOrganizerEvent;