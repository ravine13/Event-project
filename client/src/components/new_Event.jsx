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
    fetch('/new_event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDetails),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={eventDetails.name} onChange={handleChange} required />
      <input type="text" name="description" value={eventDetails.description} onChange={handleChange} required />
      <input type="date" name="start_date" value={eventDetails.start_date} onChange={handleChange} required />
      <input type="time" name="start_time" value={eventDetails.start_time} onChange={handleChange} required />
      <input type="date" name="end_date" value={eventDetails.end_date} onChange={handleChange} required />
      <input type="time" name="end_time" value={eventDetails.end_time} onChange={handleChange} required />
      <input type="text" name="duration" value={eventDetails.duration} onChange={handleChange} required />
      <input type="text" name="venue" value={eventDetails.venue} onChange={handleChange} required />
      <input type="text" name="photo_id" value={eventDetails.photo_id} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewEvent;
