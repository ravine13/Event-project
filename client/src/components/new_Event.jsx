import { useState } from 'react';

function NewEvent() {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    description: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    duration: '',
    venue: '',
    photo_id: '',
  });

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5555/new_event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDetails),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      // .catch((error) => console.error('Error:', error));
  };

  return (
    <form className='event-form' onSubmit={handleSubmit}>
        <h2>New Event</h2>
      <label>
        Event Name:
        <input type="text" name="name" value={eventDetails.name} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={eventDetails.description} onChange={handleChange} required />
      </label>
      <label>
        Start Date:
        <input type="date" name="start_date" value={eventDetails.start_date} onChange={handleChange} required />
      </label>
      <label>
        Start Time:
        <input type="time" name="start_time" value={eventDetails.start_time} onChange={handleChange} required />
      </label>
      <label>
        End Date:
        <input type="date" name="end_date" value={eventDetails.end_date} onChange={handleChange} required />
      </label>
      <label>
        End Time:
        <input type="time" name="end_time" value={eventDetails.end_time} onChange={handleChange} required />
      </label>
      <label>
        Duration:
        <input type="text" name="duration" value={eventDetails.duration} onChange={handleChange} required />
      </label>
      <label>
        Venue:
        <input type="text" name="venue" value={eventDetails.venue} onChange={handleChange} required />
      </label>
      <label>
        Photo ID:
        <input type="text" name="photo_id" value={eventDetails.photo_id} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewEvent;
