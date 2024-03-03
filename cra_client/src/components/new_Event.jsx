import { useState } from 'react';
import { addEvent } from '../services/api';

function NewEvent() {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    description: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    duration: '',
    price: '',
    venue: '',
    photo_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'start_time' || name === 'end_time') {
      formattedValue = value.replace(/[^0-9:]/g, '');
      const [hours, minutes] = formattedValue.split(':').map(part => parseInt(part));
      if (!isNaN(hours) && !isNaN(minutes)) {
        const formattedHours = Math.min(Math.max(hours, 0), 23);
        const formattedMinutes = Math.min(Math.max(minutes, 0), 59);
        formattedValue = `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes.toString().padStart(2, '0')}`;
      }
    }

    setEventDetails({ ...eventDetails, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
  
    try {
      const response = await addEvent(eventDetails);
      console.log('Event created successfully:', response.data); 
    } catch (error) {
      console.error('Error creating event:', error.response.data);
    }
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
        Set Price:
        <input type="number" name="price" value={eventDetails.price} onChange={handleChange} required />
      </label>
      <label>
        Photo Url:
        <input type="text" name="photo_url" value={eventDetails.photo_url} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewEvent;
